import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'sa', name: 'संस्कृत', flag: '🕉️' }
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <div className="language-dropdown">
        <button className="language-btn">
          {languages.find(lang => lang.code === i18n.language)?.flag || '🌐'}
          <span className="language-text">
            {languages.find(lang => lang.code === i18n.language)?.name || 'Language'}
          </span>
          <span className="dropdown-arrow">▼</span>
        </button>
        <div className="language-menu">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${i18n.language === lang.code ? 'active' : ''}`}
              onClick={() => changeLanguage(lang.code)}
            >
              <span className="flag">{lang.flag}</span>
              <span className="name">{lang.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;