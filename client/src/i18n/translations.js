const translations = {
    en: {
        nav: {
            home: 'Home',
            myStudy: 'My Study',
            analytics: 'Analytics',
            about: 'About',
            theme: 'Theme',
            lang: 'Language'
        },
        home: {
            heroTitle: 'Transform Your Study Material into AI-Powered Notes',
            heroSubtitle: 'Upload a PDF, and let StudyMate analyze it to create summaries, smart notes, and interactive quizzes instantly.',
            dropText: 'Drag and drop your PDF here, or',
            browse: 'browse',
            uploadBtn: 'Upload PDF',
            selectPdf: 'Please select a PDF file.'
        },
        dashboard: {
            title: 'Study Dashboard',
            uploadSuccess: 'PDF Uploaded Successfully!',
            fileReady: 'Your file is ready:',
            analyzeBtn: 'Analyze PDF',
            subject: 'Subject',
            keyFocus: 'Key Focus',
            overview: 'Overview',
            priority: 'Priority',
            why: 'Why',
            smartNotes: 'Smart Study Notes',
            difficulty: 'Difficulty',
            count: 'Count',
            generateMCQs: 'Generate MCQs',
            generateMcqsFirst: 'Please generate MCQs first.',
            quizCompleted: 'Quiz Completed!',
            retryQuiz: 'Retry Quiz',
            submitQuiz: 'Submit Quiz',
            tabs: {
                overview: 'Overview',
                topics: 'Topics',
                notes: 'Notes',
                mcqs: 'MCQs',
                quiz: 'Quiz'
            }
        },
        about: {
            description: "StudyMate turns PDFs into summaries, notes, and quizzes with AI.",
            privacy: "PDF text is sent to Groq’s cloud API for AI processing.",
            featureLocal: "Cloud AI:",
            featureLocalDesc: "Analysis is processed by Groq.",
            featureSmart: 'Smart Extraction:',
            featureSmartDesc: 'Automatically finds key concepts and formulas.',
            featureInteractive: 'Interactive:',
            featureInteractiveDesc: 'Test yourself with AI-generated MCQs.'
        },
        mystudy: {
            description: 'View and manage your saved study sessions.',
            placeholder: 'No saved studies yet. Upload a PDF on the Home page to get started.'
        },
        auth: {
            loginTitle: 'Login to StudyMate',
            loginSubtitle: 'Welcome back! Please enter your details.',
            loginBtn: 'Login',
            registerTitle: 'Create Account',
            registerSubtitle: 'Join StudyMate and start learning',
            registerBtn: 'Register'
        },
        profile: {
            tabProfile: 'Profile',
            tabSettings: 'Settings',
            tabSecurity: 'Security',
            name: 'Full Name',
            email: 'Email Address',
            bio: 'Bio / Academic Interest',
            bioPlaceholder: 'Tell us about your study goals or major...',
            saveBtn: 'Save Profile',
            updatedSuccess: 'Profile updated successfully!',
            currentPassword: 'Current Password',
            newPassword: 'New Password',
            confirmPassword: 'Confirm New Password',
            updatePasswordBtn: 'Update Password',
            passwordSuccess: 'Password changed successfully!'
        },
        common: {
            loading: 'AI is thinking...',
            uploading: 'Uploading...',
            error: 'Analysis failed. Please try again.',
            copied: 'Copied to clipboard!',
            analyzing: 'Analyzing...',
            generating: 'Generating...',
            aiThinking: 'AI is thinking...',
            copyNotes: 'Copy Notes',
            confirmDelete: 'Are you sure you want to delete this study?',
            view: 'View',
            delete: 'Delete'
        }
    },
    hi: {
        nav: {
            home: 'होम',
            myStudy: 'मेरी पढ़ाई',
            about: 'के बारे में',
            theme: 'थीम',
            lang: 'भाषा'
        },
        home: {
            heroTitle: 'अपनी अध्ययन सामग्री को AI-पावर्ड नोट्स में बदलें',
            heroSubtitle: 'एक PDF अपलोड करें, और StudyMate को उसका विश्लेषण करके सारांश, स्मार्ट नोट्स और इंटरैक्टिव क्विज़ बनाने दें।',
            dropText: 'अपना PDF यहाँ ड्रैग और ड्रॉप करें, या',
            browse: 'ब्राउज़ करें',
            uploadBtn: 'PDF अपलोड करें',
            selectPdf: 'कृपया एक PDF फ़ाइल चुनें।'
        },
        dashboard: {
            title: 'अध्ययन डैशबोर्ड',
            uploadSuccess: 'PDF सफलतापूर्वक अपलोड किया गया!',
            fileReady: 'आपकी फ़ाइल तैयार है:',
            analyzeBtn: 'PDF का विश्लेषण करें',
            subject: 'विषय',
            keyFocus: 'मुख्य फोकस',
            overview: 'अवलोकन',
            priority: 'प्राथमिकता',
            why: 'क्यों',
            smartNotes: 'स्मार्ट स्टडी नोट्स',
            difficulty: 'कठिनाई',
            count: 'संख्या',
            generateMCQs: 'MCQs जेनरेट करें',
            generateMcqsFirst: 'कृपया पहले MCQs जेनरेट करें।',
            quizCompleted: 'क्विज़ पूरा हुआ!',
            retryQuiz: 'क्विज़ फिर से लें',
            submitQuiz: 'क्विज़ जमा करें',
            tabs: {
                overview: 'अवलोकन',
                topics: 'विषय',
                notes: 'नोट्स',
                mcqs: 'MCQs',
                quiz: 'क्विज़'
            }
        },
        about: {
            description: "StudyMate AI की मदद से PDF को सारांश, नोट्स और क्विज़ में बदलता है।",
            privacy: "AI प्रोसेसिंग के लिए PDF का टेक्स्ट Groq के क्लाउड API को भेजा जाता है।",
            featureLocal: "क्लाउड AI:",
            featureLocalDesc: "विश्लेषण Groq द्वारा किया जाता है।",
            featureSmart: 'स्मार्ट एक्सट्रैक्शन:',
            featureSmartDesc: 'मुख्य अवधारणाओं और सूत्रों को स्वचालित रूप से खोजता है।',
            featureInteractive: 'इंटरैक्टिव:',
            featureInteractiveDesc: 'AI-जेनरेटेड MCQs के साथ अपना परीक्षण करें।'
        },
        mystudy: {
            description: 'अपने सहेजे गए अध्ययन सत्र देखें और प्रबंधित करें।',
            placeholder: 'अभी तक कोई सहेजा हुआ अध्ययन नहीं है। शुरू करने के लिए होम पेज पर PDF अपलोड करें।'
        },
        auth: {
            loginTitle: 'StudyMate में लॉगिन करें',
            loginSubtitle: 'स्वागत है! कृपया अपना विवरण दर्ज करें।',
            loginBtn: 'लॉगिन',
            registerTitle: 'खाता बनाएं',
            registerSubtitle: 'StudyMate से जुड़ें और सीखना शुरू करें',
            registerBtn: 'रजिस्टर'
        },
        profile: {
            tabProfile: 'प्रोफ़ाइल',
            tabSettings: 'सेटिंग्स',
            tabSecurity: 'सुरक्षा',
            name: 'पूरा नाम',
            email: 'ईमेल पता',
            bio: 'बायो / अकादमिक रुचि',
            bioPlaceholder: 'अपने अध्ययन लक्ष्यों या विषय के बारे में बताएं...',
            saveBtn: 'प्रोफ़ाइल सहेजें',
            updatedSuccess: 'प्रोफ़ाइल सफलतापूर्वक अपडेट हुई!',
            currentPassword: 'वर्तमान पासवर्ड',
            newPassword: 'नया पासवर्ड',
            confirmPassword: 'नया पासवर्ड पुष्टि करें',
            updatePasswordBtn: 'पासवर्ड अपडेट करें',
            passwordSuccess: 'पासवर्ड सफलतापूर्वक बदला गया!'
        },
        common: {
            loading: 'AI सोच रहा है...',
            uploading: 'अपलोड हो रहा है...',
            error: 'विश्लेषण विफल रहा। कृपया पुनः प्रयास करें।',
            copied: 'क्लिपबोर्ड पर कॉपी किया गया!',
            analyzing: 'विश्लेषण हो रहा है...',
            generating: 'जेनरेट हो रहा है...',
            aiThinking: 'AI सोच रहा है...',
            copyNotes: 'नोट्स कॉपी करें',
            confirmDelete: 'क्या आप वाकई इस अध्ययन को हटाना चाहते हैं?',
            view: 'देखें',
            delete: 'हटाएं'
        }
    },
    es: {
        nav: { home: 'Inicio', myStudy: 'Mi Estudio', about: 'Acerca de', theme: 'Tema', lang: 'Idioma' },
        home: {
            heroTitle: 'Transforma tu material de estudio en notas impulsadas por IA',
            heroSubtitle: 'Sube un PDF y deja que StudyMate lo analice para crear resúmenes, notas inteligentes y cuestionarios interactivos al instante.',
            dropText: 'Arrastra y suelta tu PDF aquí, o',
            browse: 'explorar',
            uploadBtn: 'Subir PDF',
            selectPdf: 'Por favor, selecciona un archivo PDF.'
        },
        dashboard: {
            title: 'Panel de Estudio',
            uploadSuccess: '¡PDF subido con éxito!',
            fileReady: 'Tu archivo está listo:',
            analyzeBtn: 'Analizar PDF',
            subject: 'Asunto',
            keyFocus: 'Enfoque Clave',
            overview: 'Resumen',
            priority: 'Prioridad',
            why: 'Por qué',
            smartNotes: 'Notas Inteligentes',
            difficulty: 'Dificultad',
            count: 'Cantidad',
            generateMCQs: 'Generar MCQs',
            generateMcqsFirst: 'Por favor, genera MCQs primero.',
            quizCompleted: 'Â¡Cuestionario completado!',
            retryQuiz: 'Reintentar Cuestionario',
            submitQuiz: 'Enviar Cuestionario',
            tabs: { overview: 'Resumen', topics: 'Temas', notes: 'Notas', mcqs: 'MCQs', quiz: 'Cuestionario' }
        },
        about: {
            description: "StudyMate convierte PDFs en resúmenes, apuntes y cuestionarios con IA.",
            privacy: "El texto del PDF se envía a la API en la nube de Groq para procesarlo con IA.",
            featureLocal: "IA en la nube:",
            featureLocalDesc: "Groq procesa el contenido.",
            featureSmart: 'Extracción Inteligente:',
            featureSmartDesc: 'Encuentra automáticamente conceptos clave y fórmulas.',
            featureInteractive: 'Interactivo:',
            featureInteractiveDesc: 'Ponte a prueba con MCQs generados por IA.'
        },
        mystudy: {
            description: 'Ve y gestiona tus sesiones de estudio guardadas.',
            placeholder: 'Aún no hay estudios guardados. Sube un PDF en la página de inicio para comenzar.'
        },
        auth: {
            loginTitle: 'Acceder a StudyMate',
            loginSubtitle: 'Â¡Bienvenido de nuevo! Por favor, introduce tus datos.',
            loginBtn: 'Acceder',
            registerTitle: 'Crear Cuenta',
            registerSubtitle: 'Únete a StudyMate y empieza a aprender',
            registerBtn: 'Registrarse'
        },
        profile: {
            tabProfile: 'Perfil',
            tabSettings: 'Configuración',
            tabSecurity: 'Seguridad',
            name: 'Nombre Completo',
            email: 'Correo Electrónico',
            bio: 'Bio / Interés Académico',
            bioPlaceholder: 'Cuéntanos sobre tus metas de estudio o especialidad...',
            saveBtn: 'Guardar Perfil',
            updatedSuccess: '¡Perfil actualizado con éxito!',
            currentPassword: 'Contraseña Actual',
            newPassword: 'Nueva Contraseña',
            confirmPassword: 'Confirmar Nueva Contraseña',
            updatePasswordBtn: 'Actualizar Contraseña',
            passwordSuccess: '¡Contraseña cambiada con éxito!'
        },
        common: {
            loading: 'La IA está pensando...',
            uploading: 'Subiendo...',
            error: 'El análisis falló. Por favor, inténtalo de nuevo.',
            copied: 'Â¡Copiado al portapapeles!',
            analyzing: 'Analizando...',
            generating: 'Generando...',
            aiThinking: 'La IA está pensando...',
            copyNotes: 'Copiar Notas',
            confirmDelete: '¿Estás seguro de que quieres eliminar este estudio?',
            view: 'Ver',
            delete: 'Eliminar'
        }
    },
    fr: {
        nav: { home: 'Accueil', myStudy: 'Mon Étude', about: 'À propos', theme: 'Thème', lang: 'Langue' },
        home: {
            heroTitle: 'Transformez vos supports de cours en notes boostées par l\'IA',
            heroSubtitle: 'Téléchargez un PDF et laissez StudyMate l\'analyser pour créer instantanément des résumés, des notes intelligentes et des quiz interactifs.',
            dropText: 'Glissez-déposez votre PDF ici, ou',
            browse: 'parcourir',
            uploadBtn: 'Télécharger PDF',
            selectPdf: 'Veuillez sélectionner un fichier PDF.'
        },
        dashboard: {
            title: 'Tableau de Bord',
            uploadSuccess: 'PDF téléchargé avec succès !',
            fileReady: 'Votre fichier est prêt :',
            analyzeBtn: 'Analyser le PDF',
            subject: 'Sujet',
            keyFocus: 'Focus Principal',
            overview: 'Aperçu',
            priority: 'Priorité',
            why: 'Pourquoi',
            smartNotes: 'Notes Intelligentes',
            difficulty: 'Difficulté',
            count: 'Nombre',
            generateMCQs: 'Générer des QCM',
            generateMcqsFirst: 'Veuillez d\'abord générer des QCM.',
            quizCompleted: 'Quiz terminé !',
            retryQuiz: 'Recommencer le Quiz',
            submitQuiz: 'Soumettre le Quiz',
            tabs: { overview: 'Aperçu', topics: 'Sujets', notes: 'Notes', mcqs: 'QCM', quiz: 'Quiz' }
        },
        about: {
            description: "StudyMate transforme les PDF en résumés, notes et quiz grâce à l’IA.",
            privacy: "Le texte du PDF est envoyé à l’API cloud de Groq pour le traitement par IA.",
            featureLocal: "IA cloud :",
            featureLocalDesc: "Le contenu est traité par Groq.",
            featureSmart: 'Extraction Intelligente :',
            featureSmartDesc: 'Trouve automatiquement les concepts clés et les formules.',
            featureInteractive: 'Interactif :',
            featureInteractiveDesc: 'Testez-vous avec des QCM générés par l\'IA.'
        },
        mystudy: {
            description: 'Consultez et gérez vos sessions d\'étude sauvegardées.',
            placeholder: 'Aucune étude sauvegardée pour l\'instant. Téléchargez un PDF sur la page d\'accueil pour commencer.'
        },
        auth: {
            loginTitle: 'Connexion à StudyMate',
            loginSubtitle: 'Bon retour ! Veuillez entrer vos informations.',
            loginBtn: 'Connexion',
            registerTitle: 'Créer un compte',
            registerSubtitle: 'Rejoignez StudyMate et commencez à apprendre',
            registerBtn: 'S\'inscrire'
        },
        profile: {
            tabProfile: 'Profil',
            tabSettings: 'Paramètres',
            tabSecurity: 'Sécurité',
            name: 'Nom Complet',
            email: 'Adresse E-mail',
            bio: 'Bio / Intérêt Académique',
            bioPlaceholder: 'Parlez-nous de vos objectifs d\'étude ou de votre spécialité...',
            saveBtn: 'Sauvegarder le Profil',
            updatedSuccess: 'Profil mis à jour avec succès !',
            currentPassword: 'Mot de Passe Actuel',
            newPassword: 'Nouveau Mot de Passe',
            confirmPassword: 'Confirmer le Nouveau Mot de Passe',
            updatePasswordBtn: 'Mettre à Jour le Mot de Passe',
            passwordSuccess: 'Mot de passe changé avec succès !'
        },
        common: {
            loading: 'L\'IA réfléchit...',
            uploading: 'Téléchargement...',
            error: 'L\'analyse a échoué. Veuillez réessayer.',
            copied: 'Copié dans le presse-papiers !',
            analyzing: 'Analyse en cours...',
            generating: 'Génération en cours...',
            aiThinking: 'L\'IA réfléchit...',
            copyNotes: 'Copier les Notes',
            confirmDelete: 'Êtes-vous sûr de vouloir supprimer cette étude ?',
            view: 'Voir',
            delete: 'Supprimer'
        }
    },
    de: {
        nav: { home: 'Startseite', myStudy: 'Mein Studium', about: 'Über uns', theme: 'Thema', lang: 'Sprache' },
        home: {
            heroTitle: 'Verwandeln Sie Ihr Lernmaterial in KI-gestützte Notizen',
            heroSubtitle: 'Laden Sie ein PDF hoch und lassen Sie StudyMate es analysieren, um sofort Zusammenfassungen, intelligente Notizen und interaktive Quizze zu erstellen.',
            dropText: 'Ziehen Sie Ihr PDF hierher oder',
            browse: 'durchsuchen',
            uploadBtn: 'PDF hochladen',
            selectPdf: 'Bitte wählen Sie eine PDF-Datei aus.'
        },
        dashboard: {
            title: 'Lern-Dashboard',
            uploadSuccess: 'PDF erfolgreich hochgeladen!',
            fileReady: 'Ihre Datei ist bereit:',
            analyzeBtn: 'PDF analysieren',
            subject: 'Fach',
            keyFocus: 'Hauptfokus',
            overview: 'Überblick',
            priority: 'Priorität',
            why: 'Warum',
            smartNotes: 'Intelligente Notizen',
            difficulty: 'Schwierigkeit',
            count: 'Anzahl',
            generateMCQs: 'MCQs generieren',
            generateMcqsFirst: 'Bitte generieren Sie zuerst MCQs.',
            quizCompleted: 'Quiz beendet!',
            retryQuiz: 'Quiz wiederholen',
            submitQuiz: 'Quiz absenden',
            tabs: { overview: 'Überblick', topics: 'Themen', notes: 'Notizen', mcqs: 'MCQs', quiz: 'Quiz' }
        },
        about: {
            description: "StudyMate erstellt mit KI Zusammenfassungen, Notizen und Quizfragen aus PDFs.",
            privacy: "PDF-Text wird zur KI-Verarbeitung an die Groq-Cloud-API gesendet.",
            featureLocal: "Cloud-KI:",
            featureLocalDesc: "Die Analyse erfolgt durch Groq.",
            featureSmart: 'Intelligente Extraktion:',
            featureSmartDesc: 'Findet automatisch Schlüsselkonzepte und Formeln.',
            featureInteractive: 'Interaktiv:',
            featureInteractiveDesc: 'Testen Sie sich selbst mit KI-generierten MCQs.'
        },
        mystudy: {
            description: 'Sehen und verwalten Sie Ihre gespeicherten Lernsitzungen.',
            placeholder: 'Noch keine gespeicherten Studien. Laden Sie auf der Startseite eine PDF hoch, um loszulegen.'
        },
        auth: {
            loginTitle: 'Login bei StudyMate',
            loginSubtitle: 'Willkommen zurück! Bitte geben Sie Ihre Daten ein.',
            loginBtn: 'Login',
            registerTitle: 'Konto erstellen',
            registerSubtitle: 'Treten Sie StudyMate bei und beginnen Sie zu lernen',
            registerBtn: 'Registrieren'
        },
        profile: {
            tabProfile: 'Profil',
            tabSettings: 'Einstellungen',
            tabSecurity: 'Sicherheit',
            name: 'Vollständiger Name',
            email: 'E-Mail-Adresse',
            bio: 'Bio / Akademisches Interesse',
            bioPlaceholder: 'Erzählen Sie uns von Ihren Lernzielen oder Ihrem Studienfach...',
            saveBtn: 'Profil speichern',
            updatedSuccess: 'Profil erfolgreich aktualisiert!',
            currentPassword: 'Aktuelles Passwort',
            newPassword: 'Neues Passwort',
            confirmPassword: 'Neues Passwort bestätigen',
            updatePasswordBtn: 'Passwort aktualisieren',
            passwordSuccess: 'Passwort erfolgreich geändert!'
        },
        common: {
            loading: 'KI denkt nach...',
            uploading: 'Hochladen...',
            error: 'Analyse fehlgeschlagen. Bitte versuchen Sie es erneut.',
            copied: 'In die Zwischenablage kopiert!',
            analyzing: 'Analyse läuft...',
            generating: 'Generierung läuft...',
            aiThinking: 'KI denkt nach...',
            copyNotes: 'Notizen kopieren',
            confirmDelete: 'Sind Sie sicher, dass Sie dieses Studium löschen möchten?',
            view: 'Ansehen',
            delete: 'Löschen'
        }
    },
    bn: {
        nav: { home: 'হোম', myStudy: 'আমার পড়াশোনা', about: 'সম্পর্কে', theme: 'থিম', lang: 'ভাষা' },
        home: {
            heroTitle: 'আপনার পড়াশোনার সামগ্রীকে AI-চালিত নোটে রূপান্তর করুন',
            heroSubtitle: 'একটি PDF আপলোড করুন এবং StudyMate-কে এটি বিশ্লেষণ করতে দিন যাতে মুহূর্তেই সারাংশ, স্মার্ট নোট এবং ইন্টারেক্টিভ কুইজ তৈরি হয়।',
            dropText: 'আপনার PDF এখানে ড্র্যাগ এবং ড্রপ করুন, অথবা',
            browse: 'ব্রাউজ করুন',
            uploadBtn: 'PDF আপলোড করুন',
            selectPdf: 'অনুগ্রহ করে একটি PDF ফাইল নির্বাচন করুন।'
        },
        dashboard: {
            title: 'স্টাডি ড্যাশবোর্ড',
            uploadSuccess: 'PDF সফলভাবে আপলোড করা হয়েছে!',
            fileReady: 'আপনার ফাইল প্রস্তুত:',
            analyzeBtn: 'PDF বিশ্লেষণ করুন',
            subject: 'বিষয়',
            keyFocus: 'মূল ফোকাস',
            overview: 'সংক্ষিপ্ত বিবরণ',
            priority: 'অগ্রাধিকার',
            why: 'কেন',
            smartNotes: 'স্মার্ট স্টাডি নোটস',
            difficulty: 'কাঠিন্য',
            count: 'সংখ্যা',
            generateMCQs: 'MCQ তৈরি করুন',
            generateMcqsFirst: 'অনুগ্রহ করে আগে MCQ তৈরি করুন।',
            quizCompleted: 'কুইজ সম্পন্ন হয়েছে!',
            retryQuiz: 'কুইজ পুনরায় চেষ্টা করুন',
            submitQuiz: 'কুইজ জমা দিন',
            tabs: { overview: 'সংক্ষিপ্ত বিবরণ', topics: 'বিষয়', notes: 'নোটস', mcqs: 'MCQs', quiz: 'কুইজ' }
        },
        about: {
            description: "StudyMate AI দিয়ে PDF থেকে সারাংশ, নোট এবং কুইজ তৈরি করে।",
            privacy: "AI প্রক্রিয়াকরণের জন্য PDF-এর লেখা Groq-এর ক্লাউড API-তে পাঠানো হয়।",
            featureLocal: "ক্লাউড AI:",
            featureLocalDesc: "Groq কনটেন্ট বিশ্লেষণ করে।",
            featureSmart: 'স্মার্ট এক্সট্রাকশন:',
            featureSmartDesc: 'স্বয়ংক্রিয়ভাবে মূল ধারণা এবং সূত্র খুঁজে বের করে।',
            featureInteractive: 'ইন্টারেক্টিভ:',
            featureInteractiveDesc: 'AI-জেনারেটেড MCQs দিয়ে নিজেকে পরীক্ষা করুন।'
        },
        mystudy: {
            description: 'আপনার সংরক্ষিত পড়াশোনার সেশনগুলি দেখুন এবং পরিচালনা করুন।',
            placeholder: 'এখনও কোনো সংরক্ষিত পড়াশোনা নেই। শুরু করতে হোম পেজে একটি PDF আপলোড করুন।'
        },
        auth: {
            loginTitle: 'StudyMate-এ লগইন করুন',
            loginSubtitle: 'স্বাগতম! আপনার বিবরণ প্রদান করুন।',
            loginBtn: 'লগইন',
            registerTitle: 'অ্যাকাউন্ট তৈরি করুন',
            registerSubtitle: 'StudyMate-এ যোগ দিন এবং শেখা শুরু করুন',
            registerBtn: 'রেজিস্টার'
        },
        profile: {
            tabProfile: 'প্রোফাইল',
            tabSettings: 'সেটিংস',
            tabSecurity: 'নিরাপত্তা',
            name: 'পূর্ণ নাম',
            email: 'ইমেইল ঠিকানা',
            bio: 'বায়ো / একাডেমিক আগ্রহ',
            bioPlaceholder: 'আপনার পড়াশোনার লক্ষ্য বা বিভাগ সম্পর্কে বলুন...',
            saveBtn: 'প্রোফাইল সংরক্ষণ করুন',
            updatedSuccess: 'প্রোফাইল সফলভাবে আপডেট হয়েছে!',
            currentPassword: 'বর্তমান পাসওয়ার্ড',
            newPassword: 'নতুন পাসওয়ার্ড',
            confirmPassword: 'নতুন পাসওয়ার্ড নিশ্চিত করুন',
            updatePasswordBtn: 'পাসওয়ার্ড আপডেট করুন',
            passwordSuccess: 'পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে!'
        },
        common: {
            loading: 'AI চিন্তা করছে...',
            uploading: 'আপলোড হচ্ছে...',
            error: 'বিশ্লেষণ ব্যর্থ হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।',
            copied: 'ক্লিপবোর্ডে কপি করা হয়েছে!',
            analyzing: 'বিশ্লেষণ করা হচ্ছে...',
            generating: 'তৈরি করা হচ্ছে...',
            aiThinking: 'AI চিন্তা করছে...',
            copyNotes: 'নোটস কপি করুন',
            confirmDelete: 'আপনি কি নিশ্চিত যে আপনি এই পড়াশোনাটি মুছে ফেলতে চান?',
            view: 'দেখুন',
            delete: 'মুছে ফেলুন'
        }
    },
    mr: {
        nav: { home: 'मुख्यपृष्ठ', myStudy: 'माझा अभ्यास', about: 'बद्दल', theme: 'थीम', lang: 'भाषा' },
        home: {
            heroTitle: 'तुमच्या अभ्यासाच्या साहित्याचे AI-आधारित नोट्समध्ये रूपांतर करा',
            heroSubtitle: 'एक PDF अपलोड करा आणि StudyMate ला त्याचे विश्लेषण करून सारांश, स्मार्ट नोट्स आणि इंटरएक्टिव क्विझ तयार करू द्या.',
            dropText: 'तुमची PDF येथे ड्रॅग आणि ड्रॉप करा, किंवा',
            browse: 'ब्राउझ करा',
            uploadBtn: 'PDF अपलोड करा',
            selectPdf: 'कृपया एक PDF फाईल निवडा.'
        },
        dashboard: {
            title: 'अभ्यास डॅशबोर्ड',
            uploadSuccess: 'PDF यशस्वीरित्या अपलोड झाली!',
            fileReady: 'तुमची फाईल तयार आहे:',
            analyzeBtn: 'PDF विश्लेषण करा',
            subject: 'विषय',
            keyFocus: 'मुख्य लक्ष',
            overview: 'आढावा',
            priority: 'प्राधान्य',
            why: 'का',
            smartNotes: 'स्मार्ट स्टडी नोट्स',
            difficulty: 'काठिण्य',
            count: 'संख्या',
            generateMCQs: 'MCQs तयार करा',
            generateMcqsFirst: 'कृपया आधी MCQs तयार करा.',
            quizCompleted: 'क्विझ पूर्ण झाली!',
            retryQuiz: 'क्विज़ पुन्हा करा',
            submitQuiz: 'क्विज़ सबमिट करा',
            tabs: { overview: 'आढावा', topics: 'विषय', notes: 'नोट्स', mcqs: 'MCQs', quiz: 'क्विज़' }
        },
        about: {
            description: "StudyMate AI वापरून PDF चे सारांश, नोट्स आणि क्विझ तयार करते.",
            privacy: "AI प्रक्रियेसाठी PDF मधील मजकूर Groq च्या क्लाउड API कडे पाठवला जातो.",
            featureLocal: "क्लाउड AI:",
            featureLocalDesc: "विश्लेषण Groq द्वारे केले जाते.",
            featureSmart: 'स्मार्ट एक्सट्रॅक्शन:',
            featureSmartDesc: 'मुख्य संकल्पना आणि सूत्रे स्वयंचलितपणे शोधते.',
            featureInteractive: 'इंटरएक्टिव:',
            featureInteractiveDesc: 'AI-द्वारे तयार केलेल्या MCQs सह स्वतःची चाचणी घ्या.'
        },
        mystudy: {
            description: 'तुमचे जतन केलेले अभ्यास सत्र पहा आणि व्यवस्थापित करा.',
            placeholder: 'अद्याप कोणतेही जतन केलेले अभ्यास नाहीत. सुरू करण्यासाठी होम पेजवर PDF अपलोड करा.'
        },
        auth: {
            loginTitle: 'StudyMate मध्ये लॉगिन करा',
            loginSubtitle: 'स्वागत आहे! कृपया तुमचे तपशील भरा.',
            loginBtn: 'लॉगिन',
            registerTitle: 'खाते तयार करा',
            registerSubtitle: 'StudyMate मध्ये सामील व्हा आणि शिकायला सुरुवात करा',
            registerBtn: 'रजिस्टर'
        },
        profile: {
            tabProfile: 'प्रोफाईल',
            tabSettings: 'सेटिंग्ज',
            tabSecurity: 'सुरक्षा',
            name: 'पूर्ण नाव',
            email: 'ईमेल पत्ता',
            bio: 'बायो / शैक्षणिक रुची',
            bioPlaceholder: 'तुमच्या अभ्यासाच्या उद्दिष्टांबद्दल किंवा विषयाबद्दल सांगा...',
            saveBtn: 'प्रोफाईल जतन करा',
            updatedSuccess: 'प्रोफाईल यशस्वीरित्या अपडेट झाली!',
            currentPassword: 'सध्याचा पासवर्ड',
            newPassword: 'नवीन पासवर्ड',
            confirmPassword: 'नवीन पासवर्ड पुष्टी करा',
            updatePasswordBtn: 'पासवर्ड अपडेट करा',
            passwordSuccess: 'पासवर्ड यशस्वीरित्या बदलला!'
        },
        common: {
            loading: 'AI विचार करत आहे...',
            uploading: 'अपलोड होत आहे...',
            error: 'विश्लेषण अयशस्वी झाले. कृपया पुन्हा प्रयत्न करा.',
            copied: 'क्लिपबोर्डवर कॉपी केले!',
            analyzing: 'विश्लेषण सुरू आहे...',
            generating: 'तयार होत आहे...',
            aiThinking: 'AI विचार करत आहे...',
            copyNotes: 'नोट्स कॉपी करा',
            confirmDelete: 'तुम्ही खात्रीने हा अभ्यास हटवू इच्छिता का?',
            view: 'पहा',
            delete: 'हटा'
        }
    },
    ta: {
        nav: { home: 'முகப்பு', myStudy: 'எனது படிப்பு', about: 'பற்றி', theme: 'தீம்', lang: 'மொழி' },
        home: {
            heroTitle: 'உங்கள் படிப்புப் பொருட்களை AI-ஆல் இயக்கப்பட்ட குறிப்புகளாக மாற்றவும்',
            heroSubtitle: 'ஒரு PDF-ஐ பதிவேற்றவும், StudyMate அதை பகுப்பாய்வு செய்து சுருக்கங்கள், ஸ்மார்ட் குறிப்புகள் மற்றும் ஊடாடும் வினாடி வினாக்களை உடனடியாக உருவாக்க அனுமதிக்கும்.',
            dropText: 'உங்கள் PDF-ஐ இங்கே இழுத்து போடவும், அல்லது',
            browse: 'தேடு',
            uploadBtn: 'PDF-ஐ பதிவேற்றவும்',
            selectPdf: 'தயவுசெய்து ஒரு PDF கோப்பைத் தேர்ந்தெடுக்கவும்.'
        },
        dashboard: {
            title: 'படிப்பு டாஷ்போர்டு',
            uploadSuccess: 'PDF வெற்றிகரமாக பதிவேற்றப்பட்டது!',
            fileReady: 'உங்கள் கோப்பு தயார்:',
            analyzeBtn: 'PDF-ஐ பகுப்பாய்வு செய்யவும்',
            subject: 'பாடம்',
            keyFocus: 'முக்கிய கவனம்',
            overview: 'மேலோட்டம்',
            priority: 'முன்னுரிமை',
            why: 'ஏன்',
            smartNotes: 'ஸ்மார்ட் படிப்பு குறிப்புகள்',
            difficulty: 'கடினத்தன்மை',
            count: 'எண்ணிக்கை',
            generateMCQs: 'MCQ-களை உருவாக்கவும்',
            generateMcqsFirst: 'தயவுசெய்து முதலில் MCQ-களை உருவாக்கவும்.',
            quizCompleted: 'வினாடி வினா முடிந்தது!',
            retryQuiz: 'வினாடி வினாவை மீண்டும் முயற்சிக்கவும்',
            submitQuiz: 'வினாடி வினாவை சமர்ப்பிக்கவும்',
            tabs: { overview: 'மேலோட்டம்', topics: 'தலைப்புகள்', notes: 'குறிப்புகள்', mcqs: 'MCQs', quiz: 'வினாடி வினா' }
        },
        about: {
            description: "StudyMate AI மூலம் PDF-களைச் சுருக்கம், குறிப்புகள் மற்றும் வினாடி வினாக்களாக மாற்றுகிறது.",
            privacy: "AI செயலாக்கத்திற்காக PDF உரை Groq கிளவுட் API-க்கு அனுப்பப்படுகிறது.",
            featureLocal: "கிளவுட் AI:",
            featureLocalDesc: "உள்ளடக்கத்தை Groq செயலாக்குகிறது.",
            featureSmart: 'ஸ்மார்ட் பிரித்தெடுத்தல்:',
            featureSmartDesc: 'முக்கிய கருத்துக்கள் மற்றும் சூத்திரங்களை தானாகவே கண்டறியும்.',
            featureInteractive: 'ஊடாடும்:',
            featureInteractiveDesc: 'AI-ஆல் உருவாக்கப்பட்ட MCQ-கள் மூலம் உங்களை நீங்களே சோதித்துக் கொள்ளுங்கள்.'
        },
        mystudy: {
            description: 'உங்கள் சேமிக்கப்பட்ட படிப்பு அமர்வுகளை பார்க்கவும் நிர்வகிக்கவும்.',
            placeholder: 'இன்னும் சேமிக்கப்பட்ட படிப்புகள் இல்லை. தொடங்க முகப்புப் பக்கத்தில் PDF பதிவேற்றவும்.'
        },
        auth: {
            loginTitle: 'StudyMate-ல் உள்நுழையவும்',
            loginSubtitle: 'மீண்டும் வரவேற்கிறோம்! உங்கள் விவரங்களை உள்ளிடவும்.',
            loginBtn: 'உள்நுழை',
            registerTitle: 'கணக்கு உருவாக்கவும்',
            registerSubtitle: 'StudyMate-ல் சேர்ந்து கற்கத் தொடங்குங்கள்',
            registerBtn: 'பதிவு செய்'
        },
        profile: {
            tabProfile: 'சுயவிவரம்',
            tabSettings: 'அமைப்புகள்',
            tabSecurity: 'பாதுகாப்பு',
            name: 'முழு பெயர்',
            email: 'மின்னஞ்சல் முகவரி',
            bio: 'சுயவிவரம் / கல்வி ஆர்வம்',
            bioPlaceholder: 'உங்கள் படிப்பு இலக்குகள் அல்லது துறை பற்றி சொல்லுங்கள்...',
            saveBtn: 'சுயவிவரம் சேமி',
            updatedSuccess: 'சுயவிவரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது!',
            currentPassword: 'தற்போதைய கடவுச்சொல்',
            newPassword: 'புதிய கடவுச்சொல்',
            confirmPassword: 'புதிய கடவுச்சொல்லை உறுதிப்படுத்தவும்',
            updatePasswordBtn: 'கடவுச்சொல்லை புதுப்பி',
            passwordSuccess: 'கடவுச்சொல் வெற்றிகரமாக மாற்றப்பட்டது!'
        },
        common: {
            loading: 'AI யோசிக்கிறது...',
            uploading: 'பதிவேற்றப்படுகிறது...',
            error: 'பகுப்பாய்வு தோல்வியடைந்தது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.',
            copied: 'கிளிப்போர்டில் நகலெடுக்கப்பட்டது!',
            analyzing: 'பகுப்பாய்வு செய்யப்படுகிறது...',
            generating: 'உருவாக்கப்படுகிறது...',
            aiThinking: 'AI யோசிக்கிறது...',
            copyNotes: 'குறிப்புகளை நகலெடுக்கவும்',
            confirmDelete: 'நீங்கள் நிச்சயமாக இந்த படிப்பை நீக்க விரும்புகிறீர்களா?',
            view: 'பார்க்கவும்',
            delete: 'நீக்கவும்'
        }
    },
    te: {
        nav: { home: 'హోమ్', myStudy: 'నా అధ్యయనం', about: 'గురించి', theme: 'థీమ్', lang: 'భాష' },
        home: {
            heroTitle: 'మీ అధ్యయన పదార్థాలను AI-ఆధారిత నోట్స్‌గా మార్చుకోండి',
            heroSubtitle: 'ఒక PDFని అప్‌లోడ్ చేయండి, StudyMate దానిని విశ్లేషించి సారాంశాలు, స్మార్ట్ నోట్స్ మరియు ఇంటరాక్టివ్ క్విజ్‌లను తక్షణమే రూపొందించేలా చేయండి.',
            dropText: 'మీ PDFని ఇక్కడ డ్రాగ్ అండ్ డ్రాప్ చేయండి, లేదా',
            browse: 'బ్రౌజ్ చేయండి',
            uploadBtn: 'PDF అప్‌లోడ్ చేయండి',
            selectPdf: 'దయచేసి ఒక PDF ఫైల్‌ను ఎంచుకోండి.'
        },
        dashboard: {
            title: 'స్టడీ డ్యాష్‌బోర్డ్',
            uploadSuccess: 'PDF విజయవంతంగా అప్‌లోడ్ చేయబడింది!',
            fileReady: 'మీ ఫైల్ సిద్ధంగా ఉంది:',
            analyzeBtn: 'PDF విశ్లేషించండి',
            subject: 'విషయం',
            keyFocus: 'ప్రధాన దృష్టి',
            overview: 'అవలోకనం',
            priority: 'ప్రాధాన్యత',
            why: 'ఎందుకు',
            smartNotes: 'స్మార్ట్ స్టడీ నోట్స్',
            difficulty: 'కఠినత్వం',
            count: 'సంఖ్య',
            generateMCQs: 'MCQs రూపొందించండి',
            generateMcqsFirst: 'దయచేసి ముందుగా MCQs రూపొందించండి.',
            quizCompleted: 'క్విజ్ పూర్తయింది!',
            retryQuiz: 'క్విజ్ మళ్ళీ ప్రయత్నించండి',
            submitQuiz: 'క్విజ్ సమర్పించండి',
            tabs: { overview: 'అవలోకనం', topics: 'అంశాలు', notes: 'నోట్స్', mcqs: 'MCQs', quiz: 'క్విజ్' }
        },
        about: {
            description: "StudyMate AIతో PDFలను సారాంశాలు, నోట్స్, క్విజ్‌లుగా మారుస్తుంది.",
            privacy: "AI ప్రాసెసింగ్ కోసం PDF టెక్స్ట్ Groq క్లౌడ్ APIకి పంపబడుతుంది.",
            featureLocal: "క్లౌడ్ AI:",
            featureLocalDesc: "కంటెంట్‌ను Groq విశ్లేషిస్తుంది.",
            featureSmart: 'స్మార్ట్ ఎక్స్‌ట్రాక్షన్:',
            featureSmartDesc: 'ముఖ్యమైన భావనలు మరియు సూత్రాలను స్వయంచాలకంగా కనుగొంటుంది.',
            featureInteractive: 'ఇంటరాక్టివ్:',
            featureInteractiveDesc: 'AI-రూపొందించిన MCQs తో మిమ్మల్ని మీరు పరీక్షించుకోండి.'
        },
        mystudy: {
            description: 'మీ సేవ్ చేసిన అధ్యయన సెషన్లను చూడండి మరియు నిర్వహించండి.',
            placeholder: 'ఇంకా సేవ్ చేసిన అధ్యయనాలు లేవు. ప్రారంభించడానికి హోమ్ పేజీలో PDF అప్‌లోడ్ చేయండి.'
        },
        auth: {
            loginTitle: 'StudyMate లోకి లాగిన్ అవ్వండి',
            loginSubtitle: 'మళ్ళీ స్వాగతం! దయచేసి మీ వివరాలను నమోదు చేయండి.',
            loginBtn: 'లాగిన్',
            registerTitle: 'ఖాతాను సృష్టించండి',
            registerSubtitle: 'StudyMate లో చేరండి మరియు నేర్చుకోవడం ప్రారంభించండి',
            registerBtn: 'రిజిస్టర్'
        },
        profile: {
            tabProfile: 'ప్రొఫైల్',
            tabSettings: 'సెట్టింగులు',
            tabSecurity: 'భద్రత',
            name: 'పూర్తి పేరు',
            email: 'ఇమెయిల్ చిరునామా',
            bio: 'బయో / విద్యా ఆసక్తి',
            bioPlaceholder: 'మీ అధ్యయన లక్ష్యాలు లేదా విభాగం గురించి చెప్పండి...',
            saveBtn: 'ప్రొఫైల్ సేవ్ చేయండి',
            updatedSuccess: 'ప్రొఫైల్ విజయవంతంగా అప్‌డేట్ అయింది!',
            currentPassword: 'ప్రస్తుత పాస్‌వర్డ్',
            newPassword: 'కొత్త పాస్‌వర్డ్',
            confirmPassword: 'కొత్త పాస్‌వర్డ్ నిర్ధారించండి',
            updatePasswordBtn: 'పాస్‌వర్డ్ అప్‌డేట్ చేయండి',
            passwordSuccess: 'పాస్‌వర్డ్ విజయవంతంగా మార్చబడింది!'
        },
        common: {
            loading: 'AI ఆలోచిస్తోంది...',
            uploading: 'అప్‌లోడ్ అవుతోంది...',
            error: 'విశ్లేషణ విఫలమైంది. దయచేసి మళ్ళీ ప్రయత్నించండి.',
            copied: 'క్లిప్‌బోర్డ్‌కు కాపీ చేయబడింది!',
            analyzing: 'విశ్లేషిస్తోంది...',
            generating: 'రూపొందించబడుతోంది...',
            aiThinking: 'AI ఆలోచిస్తోంది...',
            copyNotes: 'నోట్స్ కాపీ చేయండి',
            confirmDelete: 'మీరు ఖచ్చితంగా ఈ అధ్యయనాన్ని తొలగించాలనుకుంటున్నారా?',
            view: 'చూడండి',
            delete: 'తొలగించండి'
        }
    }
};

export default translations;

