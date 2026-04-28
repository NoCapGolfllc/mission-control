function speakText(text) {
        if (!window.speechSynthesis) {
                console.warn("Speech Synthesis not supported in this browser.");
                        return;
                            }
                                const utterance = new SpeechSynthesisUtterance(text);
                                    utterance.lang = 'en-US'; // Customize the language
                                        window.speechSynthesis.speak(utterance);
                                        }

                                        // Example call: speakText("Welcome to Mission Control!"); 
                                        // Integrate this into your Mission Control UI where chat replies or notifications are shown.
