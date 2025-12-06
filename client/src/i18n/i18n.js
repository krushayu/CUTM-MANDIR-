import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      "nav.home": "Home",
      "nav.donation": "Donation",
      "nav.profile": "Profile",
      "nav.login": "Login",
      "nav.logout": "Logout",
      
      // Donation Page
      "donation.title": "🕉️ Make a Donation",
      "donation.subtitle": "Contribute your sacred offering to Sri Venkataswami Temple",
      "donation.amount": "💰 Select Donation Amount",
      "donation.purpose": "🎯 Select Donation Purpose",
      "donation.payment": "📱 Complete Your Donation",
      "donation.continue": "Continue →",
      "donation.back": "← Back",
      "donation.submit": "✅ Submit for Verification",
      "donation.success": "Donation Submitted Successfully!",
      "donation.amount_desc": "Choose an amount that resonates with your devotion",
      "donation.purpose_desc": "Choose where your contribution will make a difference",
      "donation.payment_desc": "Make payment and submit verification details",
      "donation.suggested_amounts": "Suggested Amounts",
      "donation.custom_amount": "Custom Amount",
      "donation.minimum": "Minimum donation: ₹1",
      "donation.upi_id": "UPI ID:",
      "donation.amount_label": "Amount:",
      "donation.purpose_label": "Purpose:",
      "donation.how_to_pay": "📱 How to Pay:",
      "donation.step1": "Open any UPI app on your phone",
      "donation.step2": "Scan the QR code above",
      "donation.step3": "Verify amount matches",
      "donation.step4": "Complete payment and save transaction details",
      "donation.verification": "Payment Verification",
      "donation.verification_desc": "After payment, please provide these details for verification",
      "donation.full_name": "👤 Full Name",
      "donation.email": "📧 Email Address",
      "donation.transaction_id": "🔢 Transaction ID / UTR Number",
      "donation.screenshot": "📸 Payment Screenshot",
      "donation.upload_screenshot": "📷 Upload Payment Screenshot",
      "donation.security_note": "🔐 All uploads are encrypted and secure",
      "donation.processing": "Processing...",
      "donation.submitted": "🙏 Your donation has been submitted for verification",
      "donation.whatsapp_sent": "📱 WhatsApp confirmation has been sent",
      "donation.receipt_email": "📧 Official receipt will be emailed within 24 hours",
      "donation.blessings": "🕉️ May the divine blessings be with you always",
      "donation.summary": "Donation Summary",
      "donation.status": "Status:",
      "donation.pending": "Pending Verification",
      "donation.view_history": "📋 View Donation History",
      "donation.make_another": "🔄 Make Another Donation",
      
      // Purpose Categories
      "purpose.festivals": "Festivals",
      "purpose.pooja": "Worship Services",
      "purpose.temple": "Temple Services",
      "purpose.development": "Development",
      
      // Festivals
      "festival.brahmotsav": "Brahmotsav",
      "festival.diwali": "Diwali",
      "festival.holi": "Holi",
      "festival.janmashtami": "Janmashtami",
      "festival.shivaratri": "Shivaratri",
      "festival.navaratri": "Navaratri",
      "festival.ganesh_chaturthi": "Ganesh Chaturthi",
      "festival.ram_navami": "Ram Navami",
      
      // Pooja Services
      "pooja.special_pooja": "Special Pooja",
      "pooja.abhishekam": "Abhishekam",
      "pooja.aarti": "Aarti",
      "pooja.annadanam": "Annadanam",
      "pooja.prasadam": "Prasadam",
      
      // Temple Services
      "temple.general": "General Donation",
      "temple.maintenance": "Maintenance",
      "temple.decoration": "Decoration",
      "temple.lighting": "Lighting",
      "temple.sound_system": "Sound System",
      "temple.security": "Security",
      "temple.cleaning": "Cleaning",
      
      // Development
      "dev.construction": "Construction",
      "dev.education": "Education",
      "dev.other": "Other",
      
      // Profile
      "profile.title": "Profile",
      "profile.edit": "Edit Profile",
      "profile.donations": "🙏 Donation History",
      
      // Common
      "common.loading": "Loading...",
      "common.enter_amount": "Enter amount",
      "common.enter_name": "Enter your full name",
      "common.enter_email": "your@email.com",
      "common.enter_transaction": "12-digit Transaction ID from your bank/UPI app",
      "common.current": "Current",
      "common.click_remove": "Click ✕ to remove"
    }
  },
  hi: {
    translation: {
      // Navigation
      "nav.home": "मुख्य",
      "nav.donation": "दान",
      "nav.profile": "प्रोफाइल",
      "nav.login": "लॉगिन",
      "nav.logout": "लॉगआउट",
      
      // Donation Page
      "donation.title": "🕉️ दान करें",
      "donation.subtitle": "श्री वेंकटस्वामी मंदिर में अपना पुण्य योगदान दें",
      "donation.amount": "💰 दान राशि चुनें",
      "donation.purpose": "🎯 दान का उद्देश्य",
      "donation.payment": "📱 अपना दान पूरा करें",
      "donation.continue": "आगे बढ़ें →",
      "donation.back": "← वापस",
      "donation.submit": "✅ सत्यापन के लिए भेजें",
      "donation.success": "दान सफलतापूर्वक जमा किया गया!",
      "donation.amount_desc": "अपनी श्रद्धा के अनुसार राशि का चयन करें",
      "donation.purpose_desc": "चुनें कि आपका योगदान कहाँ अंतर लाएगा",
      "donation.payment_desc": "भुगतान करें और सत्यापन विवरण जमा करें",
      "donation.suggested_amounts": "सुझावित राशि",
      "donation.custom_amount": "अन्य राशि",
      "donation.minimum": "न्यूनतम दान: ₹1",
      "donation.upi_id": "UPI ID:",
      "donation.amount_label": "राशि:",
      "donation.purpose_label": "उद्देश्य:",
      "donation.how_to_pay": "📱 भुगतान कैसे करें:",
      "donation.step1": "अपने फोन पर कोई भी UPI ऐप खोलें",
      "donation.step2": "ऊपर दिए गए QR कोड को स्कैन करें",
      "donation.step3": "राशि का मिलान सत्यापित करें",
      "donation.step4": "भुगतान पूरा करें और लेनदेन विवरण सहेजें",
      "donation.verification": "भुगतान सत्यापन",
      "donation.verification_desc": "भुगतान के बाद, कृपया सत्यापन के लिए ये विवरण प्रदान करें",
      "donation.full_name": "👤 पूरा नाम",
      "donation.email": "📧 ईमेल पता",
      "donation.transaction_id": "🔢 Transaction ID / UTR नंबर",
      "donation.screenshot": "📸 भुगतान स्क्रीनशॉट",
      "donation.upload_screenshot": "📷 भुगतान स्क्रीनशॉट अपलोड करें",
      "donation.security_note": "🔐 सभी अपलोड एन्क्रिप्टेड और सुरक्षित हैं",
      "donation.processing": "प्रसंस्करण...",
      "donation.submitted": "🙏 आपका दान सत्यापन के लिए जमा किया गया है",
      "donation.whatsapp_sent": "📱 WhatsApp पुष्टि भेजी गई है",
      "donation.receipt_email": "📧 24 घंटे के भीतर आधिकारिक रसीद ईमेल की जाएगी",
      "donation.blessings": "🕉️ दिव्य आशीर्वाद हमेशा आपके साथ रहे",
      "donation.summary": "दान सारांश",
      "donation.status": "स्थिति:",
      "donation.pending": "सत्यापन लंबित",
      "donation.view_history": "📋 दान इतिहास देखें",
      "donation.make_another": "🔄 एक और दान करें",
      
      // Purpose Categories
      "purpose.festivals": "त्योहार",
      "purpose.pooja": "पूजा सेवा",
      "purpose.temple": "मंदिर सेवा",
      "purpose.development": "विकास",
      
      // Festivals
      "festival.brahmotsav": "ब्रह्मोत्सव",
      "festival.diwali": "दीपावली",
      "festival.holi": "होली",
      "festival.janmashtami": "जन्माष्टमी",
      "festival.shivaratri": "शिवरात्रि",
      "festival.navaratri": "नवरात्रि",
      "festival.ganesh_chaturthi": "गणेश चतुर्थी",
      "festival.ram_navami": "राम नवमी",
      
      // Pooja Services
      "pooja.special_pooja": "विशेष पूजा",
      "pooja.abhishekam": "अभिषेकम्",
      "pooja.aarti": "आरती",
      "pooja.annadanam": "अन्नदानम्",
      "pooja.prasadam": "प्रसादम्",
      
      // Temple Services
      "temple.general": "सामान्य दान",
      "temple.maintenance": "रखरखाव",
      "temple.decoration": "सजावट",
      "temple.lighting": "प्रकाश व्यवस्था",
      "temple.sound_system": "ध्वनि व्यवस्था",
      "temple.security": "सुरक्षा",
      "temple.cleaning": "सफाई",
      
      // Development
      "dev.construction": "निर्माण",
      "dev.education": "शिक्षा",
      "dev.other": "अन्य",
      
      // Profile
      "profile.title": "प्रोफाइल",
      "profile.edit": "प्रोफाइल संपादित करें",
      "profile.donations": "🙏 दान इतिहास",
      
      // Common
      "common.loading": "लोड हो रहा है...",
      "common.enter_amount": "राशि दर्ज करें",
      "common.enter_name": "अपना पूरा नाम दर्ज करें",
      "common.enter_email": "आपका@ईमेल.com",
      "common.enter_transaction": "अपने बैंक/UPI ऐप से 12-अंकीय Transaction ID",
      "common.current": "वर्तमान",
      "common.click_remove": "हटाने के लिए ✕ पर क्लिक करें"
    }
  },
  sa: {
    translation: {
      // Navigation
      "nav.home": "गृहम्",
      "nav.donation": "दानम्",
      "nav.profile": "प्रोफाइलम्",
      "nav.login": "प्रवेशः",
      "nav.logout": "निर्गमः",
      
      // Donation Page
      "donation.title": "🕉️ दानं करोतु",
      "donation.subtitle": "श्री वेंकटेश्वर मन्दिरे स्वकीयं पुण्य योगदानं दत्तवान्",
      "donation.amount": "💰 दान राशिं चिनोतु",
      "donation.purpose": "🎯 दानस्य उद्देश्यः",
      "donation.payment": "📱 स्वकीयं दानं पूर्णं करोतु",
      "donation.continue": "अग्रे गच्छतु →",
      "donation.back": "← पश्चात्",
      "donation.submit": "✅ सत्यापनार्थं प्रेषयतु",
      "donation.success": "दानं सफलतया समर्पितम्!",
      "donation.amount_desc": "स्वकीयस्य श्रद्धानुसारं राशिं चिनोतु",
      "donation.purpose_desc": "चिनोतु यत्र भवतः योगदानं अन्तरं करिष्यति",
      "donation.payment_desc": "भुगतानं करोतु च सत्यापन विवरणानि समर्पयतु",
      "donation.suggested_amounts": "सुझावित राशयः",
      "donation.custom_amount": "अन्यः राशिः",
      "donation.minimum": "न्यूनतम दानम्: ₹1",
      "donation.upi_id": "UPI ID:",
      "donation.amount_label": "राशिः:",
      "donation.purpose_label": "उद्देश्यः:",
      "donation.how_to_pay": "📱 कथं भुगतानं करोतु:",
      "donation.step1": "स्वकीये दूरभाषे कमपि UPI अनुप्रयोगं खोलयतु",
      "donation.step2": "उपरि दत्तं QR कोडं स्कैन करोतु",
      "donation.step3": "राशेः मेलनं सत्यापयतु",
      "donation.step4": "भुगतानं पूर्णं करोतु च व्यवहार विवरणानि रक्षतु",
      "donation.verification": "भुगतान सत्यापनम्",
      "donation.verification_desc": "भुगतानानन्तरं, कृपया सत्यापनार्थं एतानि विवरणानि प्रदातु",
      "donation.full_name": "👤 पूर्णं नाम",
      "donation.email": "📧 ईमेल पता",
      "donation.transaction_id": "🔢 Transaction ID / UTR संख्या",
      "donation.screenshot": "📸 भुगतान स्क्रीनशॉट",
      "donation.upload_screenshot": "📷 भुगतान स्क्रीनशॉट अपलोड करोतु",
      "donation.security_note": "🔐 सर्वाणि अपलोडानि एन्क्रिप्टेड च सुरक्षितानि सन्ति",
      "donation.processing": "प्रक्रिया...",
      "donation.submitted": "🙏 भवतः दानं सत्यापनार्थं समर्पितम्",
      "donation.whatsapp_sent": "📱 WhatsApp पुष्टिः प्रेषितः",
      "donation.receipt_email": "📧 24 घण्टेषु आधिकारिक रसीदः ईमेल करिष्यते",
      "donation.blessings": "🕉️ दिव्य आशीर्वादाः सदा भवतः सह तिष्ठन्तु",
      "donation.summary": "दान सारांशः",
      "donation.status": "स्थितिः:",
      "donation.pending": "सत्यापनं लम्बितम्",
      "donation.view_history": "📋 दान इतिहासं पश्यतु",
      "donation.make_another": "🔄 अपरं दानं करोतु",
      
      // Purpose Categories
      "purpose.festivals": "उत्सवाः",
      "purpose.pooja": "पूजा सेवा",
      "purpose.temple": "मन्दिर सेवा",
      "purpose.development": "विकासः",
      
      // Festivals
      "festival.brahmotsav": "ब्रह्मोत्सवः",
      "festival.diwali": "दीपावली",
      "festival.holi": "होली",
      "festival.janmashtami": "जन्माष्टमी",
      "festival.shivaratri": "शिवरात्रिः",
      "festival.navaratri": "नवरात्रि",
      "festival.ganesh_chaturthi": "गणेश चतुर्थी",
      "festival.ram_navami": "राम नवमी",
      
      // Pooja Services
      "pooja.special_pooja": "विशेष पूजा",
      "pooja.abhishekam": "अभिषेकम्",
      "pooja.aarti": "आरती",
      "pooja.annadanam": "अन्नदानम्",
      "pooja.prasadam": "प्रसादम्",
      
      // Temple Services
      "temple.general": "सामान्य दानम्",
      "temple.maintenance": "रक्षणम्",
      "temple.decoration": "अलंकारः",
      "temple.lighting": "प्रकाश व्यवस्था",
      "temple.sound_system": "ध्वनि व्यवस्था",
      "temple.security": "सुरक्षा",
      "temple.cleaning": "स्वच्छता",
      
      // Development
      "dev.construction": "निर्माणम्",
      "dev.education": "शिक्षा",
      "dev.other": "अन्यत्",
      
      // Profile
      "profile.title": "प्रोफाइलम्",
      "profile.edit": "प्रोफाइलं सम्पादयतु",
      "profile.donations": "🙏 दान इतिहासः",
      
      // Common
      "common.loading": "लोडिंग...",
      "common.enter_amount": "राशिं लिखतु",
      "common.enter_name": "स्वकीयं पूर्णं नाम लिखतु",
      "common.enter_email": "भवतः@ईमेल.com",
      "common.enter_transaction": "स्वकीयात् बैंक/UPI अनुप्रयोगात् 12-अङ्कीयः Transaction ID",
      "common.current": "वर्तमानः",
      "common.click_remove": "हटाने हेतु ✕ इत्यत्र क्लिक करोतु"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;