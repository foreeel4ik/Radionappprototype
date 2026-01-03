import { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-between p-8">
        {/* Header */}
        <div className="pt-12">
          <motion.h1
            className="text-4xl mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            RADION
          </motion.h1>
          <motion.p
            className="text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {isRegister ? 'Create your account' : 'Welcome back'}
          </motion.p>
        </div>

        {/* Form */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Phone input */}
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="tel"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none backdrop-blur-sm transition-colors"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-blue-500/30"
            >
              {isRegister ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-black text-gray-500">or continue with</span>
            </div>
          </div>

          {/* Social buttons */}
          <div className="space-y-3">
            <button
              onClick={onLogin}
              className="w-full py-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-blue-500 transition-all backdrop-blur-sm flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.99 1.27-5.61 3.72-.53.36-1.01.54-1.44.52-.47-.02-1.38-.27-2.05-.49-.83-.27-1.49-.41-1.43-.87.03-.24.37-.48 1.02-.73 3.99-1.74 6.66-2.89 8-3.45 3.81-1.58 4.6-1.86 5.11-1.87.11 0 .37.03.54.17.14.11.18.26.2.37.02.09.04.29.02.45z"/>
              </svg>
              <span>Telegram</span>
            </button>

            <button
              onClick={onLogin}
              className="w-full py-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-blue-500 transition-all backdrop-blur-sm flex items-center justify-center gap-3"
            >
              <Mail className="w-6 h-6" />
              <span>Google</span>
            </button>
          </div>
        </motion.div>

        {/* Toggle register/login */}
        <div className="text-center pt-6">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isRegister ? 'Already have an account? ' : "Don't have an account? "}
            <span className="text-blue-400">{isRegister ? 'Sign In' : 'Sign Up'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
