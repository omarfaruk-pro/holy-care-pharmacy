import { useState } from 'react';

const LanguageDropdown = () => {
  const [language, setLanguage] = useState('en');

  const handleChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
  };

  return (
    <select
      className="select select-sm w-25 select-bordered"
      value={language}
      onChange={handleChange}
    >
      <option value="en">English</option>
      <option value="bn">বাংলা</option>
    </select>
  );
};

export default LanguageDropdown;
