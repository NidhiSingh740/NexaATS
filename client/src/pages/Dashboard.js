import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUp, FileText, FileCode, CheckCircle2, AlertCircle, Sparkles, Cpu, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [jdMode, setJdMode] = useState('paste');
  const [jobDescription, setJobDescription] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState('');

  const loadingMessages = [
    "Extracting document text schemas...",
    "Running vector keyword checks...",
    "Computing ATS match parameters via Gemini...",
    "Finalizing detailed scoring report..."
  ];

  useEffect(() => {
    let interval;
    if (isAnalyzing) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
      }, 2000);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles, rejectedFiles) => {
      setError('');
      if (rejectedFiles.length > 0) {
        setError('Invalid file type. Please upload a .PDF or .DOCX resume.');
        return;
      }
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
      }
    }
  });

  const handleStartAnalysis = async (e) => {
    e.preventDefault();
    setError('');

    if (!file) {
      setError('Please upload a resume file first.');
      return;
    }

    const targetJD = jdMode === 'paste' ? jobDescription : selectedRole;
    if (!targetJD || targetJD.trim() === '') {
      setError('Please paste a job description or select a role template.');
      return;
    }

    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('jobDescription', targetJD);

 
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You are not logged in. Please log in and try again.');
        setIsAnalyzing(false);
        return;
      }

   
const response = await axios.post(
  `${process.env.REACT_APP_API_BASE_URL}/api/analysis/evaluate`,
  formData,
  {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    },
    timeout: 30000
  }
);

      if (response.data.success) {
        localStorage.setItem('latestAnalysis', JSON.stringify(response.data.data));
        navigate('/analysis');
      }
    } catch (err) {
      console.error('Analysis request failed:', err);
      if (err.code === 'ECONNABORTED') {
        setError('Request timed out. The server may be busy — please try again.');
      } else {
        setError(err.response?.data?.message || 'Server pipeline failed. Please try again.');
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen text-slate-100 relative">

      <div className="mb-10 text-left">
        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
          <Sparkles className="w-7 h-7 text-purple-400" />
          AI Resume Optimization Workspace
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Upload your resume and target it against a job description for a full ATS analysis.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-sm font-semibold text-red-400">
          <AlertCircle className="w-5 h-5 shrink-0" />
          {error}
        </div>
      )}

      {!isAnalyzing ? (
        <form onSubmit={handleStartAnalysis} className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT: Resume Dropzone */}
          <div className="flex flex-col space-y-3 text-left">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Step 1: Upload Resume (PDF / DOCX)
            </label>
            <div
              {...getRootProps()}
              className={`flex-grow border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all min-h-[320px] cursor-pointer bg-slate-950/40 backdrop-blur-sm ${
                isDragActive
                  ? 'border-purple-500 bg-purple-500/5 shadow-[0_0_30px_rgba(147,51,234,0.1)]'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <input {...getInputProps()} />
              {!file ? (
                <div className="space-y-4">
                  <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mx-auto">
                    <FileUp className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-200">Drag & Drop Resume Here</p>
                    <p className="text-xs text-slate-500 mt-1">Supports PDF and DOCX — max 5MB</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-14 h-14 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center mx-auto text-purple-400">
                    {file.name.endsWith('.pdf') ? <FileText className="w-6 h-6" /> : <FileCode className="w-6 h-6" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-emerald-400 flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> File Loaded Successfully
                    </p>
                    <p className="text-xs font-mono text-slate-400 mt-1 truncate max-w-xs">{file.name}</p>
                    <p className="text-[10px] text-slate-600">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setFile(null); }}
                      className="mt-2 text-[10px] text-red-400 hover:text-red-300 underline"
                    >
                      Remove file
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Job Description */}
          <div className="flex flex-col space-y-3 text-left">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Step 2: Target Job Description
            </label>
            <div className="bg-slate-950/40 border border-slate-800/80 p-6 rounded-3xl flex-grow flex flex-col justify-between min-h-[320px]">
              <div>
                {/* Tab Toggle */}
                <div className="grid grid-cols-2 bg-slate-900 p-1 rounded-xl mb-4 border border-slate-800/60">
                  <button
                    type="button"
                    onClick={() => setJdMode('paste')}
                    className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                      jdMode === 'paste' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Paste Custom JD
                  </button>
                  <button
                    type="button"
                    onClick={() => setJdMode('dropdown')}
                    className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                      jdMode === 'dropdown' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Select Role Template
                  </button>
                </div>

                {jdMode === 'paste' ? (
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here — include required skills, responsibilities, and stack requirements..."
                    className="w-full min-h-[180px] bg-slate-900/60 border border-slate-800 focus:border-purple-500 text-white p-4 rounded-xl text-xs focus:outline-none transition-colors resize-none leading-relaxed"
                  />
                ) : (
                  <div className="space-y-2 pt-2">
                    <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                      Select a Predefined Role
                    </label>
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                    >
                      <option value="">-- Choose a Role --</option>
                      <option value="Frontend Developer with skills in React, Tailwind CSS, JavaScript, TypeScript, REST APIs, responsive design, Git, and web performance optimization.">
                        Frontend Web Engineer (React / Tailwind / JS)
                      </option>
                      <option value="Backend Developer with skills in Node.js, Express, MongoDB, PostgreSQL, REST API design, AWS, Redis, Docker, and microservices architecture.">
                        Backend System Engineer (Node / Express / Mongo)
                      </option>
                      <option value="Full Stack Developer with skills in React, Node.js, Next.js, MongoDB, PostgreSQL, Docker, CI/CD pipelines, and cloud deployments.">
                        Full Stack MERN Developer
                      </option>
                      <option value="Data Scientist with skills in Python, Machine Learning, PyTorch, TensorFlow, data analysis, pandas, NumPy, SQL, and model deployment.">
                        Data Science & ML Specialist
                      </option>
                      <option value="HR Manager with skills in talent acquisition, employee relations, performance management, HRIS systems, onboarding, compliance, and labor law.">
                        HR Manager
                      </option>
                    </select>
                  </div>
                )}
              </div>

              {/* Submit Button — FIX: Cpu icon no longer spins on idle */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 bg-purple-600 hover:bg-purple-500 text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-[0_0_30px_rgba(147,51,234,0.2)] active:scale-[0.98] transition-all cursor-pointer mt-6"
              >
                <Cpu className="w-4 h-4" />
                Run AI Analysis Pipeline
              </button>
            </div>
          </div>

        </form>
      ) : (
        /* Loading State */
        <div className="max-w-md mx-auto py-20 text-center space-y-6 bg-slate-950/40 border border-slate-800/60 rounded-3xl p-8 mt-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 animate-pulse" />
          <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto" />
          <div className="space-y-2">
            <h3 className="text-lg font-black text-white tracking-tight">Analyzing Your Resume...</h3>
            <p className="text-xs text-purple-400 font-mono tracking-wide h-6 transition-all duration-300">
              {loadingMessages[loadingStep]}
            </p>
          </div>
          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800/40">
            <div
              className="bg-purple-500 h-full transition-all duration-500"
              style={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-500 italic">
            This usually takes 5–10 seconds depending on resume length.
          </p>
        </div>
      )}
    </div>
  );
}