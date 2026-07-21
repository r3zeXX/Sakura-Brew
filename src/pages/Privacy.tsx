import { Shield, Key, EyeOff } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="py-12 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy & Security</h1>
          <p className="text-gray-600">How we protect your data and API keys</p>
          <div className="w-16 h-1 bg-sakura mx-auto rounded-full mt-6"></div>
        </div>

        <div className="space-y-12">
          
          <section className="flex flex-col md:flex-row gap-8 items-start">
            <div className="bg-matcha/10 p-4 rounded-full text-matcha shrink-0">
              <Key size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Bring Your Own Key (BYOK) Architecture</h2>
              <p className="text-gray-600 leading-relaxed">
                Sakura Brew Cafe's AI Barista uses a BYOK (Bring Your Own Key) architecture. This means we do not provide a centralized API key for the AI services. Instead, you use your own personal API keys from providers like OpenRouter, Google, or Groq.
              </p>
            </div>
          </section>

          <section className="flex flex-col md:flex-row gap-8 items-start">
            <div className="bg-sakura/20 p-4 rounded-full text-pink-700 shrink-0">
              <EyeOff size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Local-Only Storage</h2>
              <p className="text-gray-600 leading-relaxed">
                Your API keys are <strong>never sent to our servers</strong>. They are stored securely in your browser's LocalStorage. All communication with the AI providers happens directly between your browser and the provider's API. When you close or clear your browser data, your keys are removed.
              </p>
            </div>
          </section>

          <section className="flex flex-col md:flex-row gap-8 items-start">
            <div className="bg-blue-100 p-4 rounded-full text-blue-700 shrink-0">
              <Shield size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Security Protections</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>No Analytics:</strong> We do not track your conversations or page views.</li>
                <li><strong>Sanitized Input:</strong> All Markdown and HTML rendered in the chat is sanitized to prevent XSS attacks.</li>
                <li><strong>Static Hosting:</strong> This application is a purely static site hosted on GitHub Pages, meaning there is no backend database to compromise.</li>
                <li><strong>Key Masking:</strong> In the UI, your keys are masked (showing only the last 4 characters) to prevent shoulder surfing.</li>
              </ul>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Privacy;
