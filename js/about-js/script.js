       // Données aléatoires
        const banque_professions = ["Développeur", "Commercial", "Ingénieur IT", "Designer UX", "Administrateur", "Chef de Projet"];
        const banque_entreprises = ["Durance Média", "Bio&Bon", "Fitissimo", "Tempo", "Tech Solutions"];
        const banque_ecoles = ["École Amédé Autran", "Université IT", "Supinfo Mada", "ISPM"];
        const banque_logiciels = ["Logiciel 1", "Logiciel 2", "Logiciel 3", "Photoshop", "Suite Office", "Visual Studio", "Figma"];

        function obtenirAleatoire(tableau, quantite) {
            return [...tableau].sort(() => 0.5 - Math.random()).slice(0, quantite);
        }

        const liste_personnes = [
            {
                id: 1, nom: "RAJAONARIVELO Fanantenana", nomComplet: "RAJAONARIVELO Fanantenana Sedra Fitahiana",
                image: "../../apropos/uploads/fanantenana.jpg", email: "fanantenana.r@mail.com", telephone: "123-456-7890"
            },
            {
                id: 2, nom: "RANAIVOARIMANANA Vahatra", nomComplet: "RANAIVOARIMANANA Vahatra Mitsinjosoa",
                image: "../../apropos/uploads/vahatra.jpg", email: "vahatra.r@mail.com", telephone: "123-456-7891"
            },
            {
                id: 3, nom: "RAZAFINDRABE Toky", nomComplet: "RAZAFINDRABE Toky Mandresy",
                image: "../../apropos/uploads/mandresy.jpeg", email: "toky.r@mail.com", telephone: "123-456-7892"
            },
            {
                id: 4, nom: "AICHI Joarisoa", nomComplet: "AICHI Joarisoa",
                image: "../../apropos/uploads/aichi.jpg", email: "aichiandrianjoarisoa@gmail.com", telephone: "123-456-7893"
            },
            {
                id: 5, nom: "FIDINANAHARY Hery", nomComplet: "FIDINANAHARY Hery Tiavintsoa",
                image: "../../apropos/uploads/tiavina.jpg", email: "hery.f@mail.com", telephone: "123-456-7894"
            },
            {
                id: 6, nom: "TOUTOU Armel", nomComplet: "TOUTOU Armel Marc",
                image: "../../apropos/uploads/armel.jpeg", email: "armel.t@mail.com", telephone: "123-456-7895"
            }
        ].map(personne => {
            const profession = obtenirAleatoire(banque_professions, 1)[0];
            return {
                ...personne,
                profession: profession,
                profil_texte: "Déterminé, sérieux, autonome et conscient du travail qui m'attend, je suis persuadé que je serais un élément moteur au sein de votre structure !",
                logiciels: obtenirAleatoire(banque_logiciels, 3),
                langues: [
                    { nom: "Arabe", niv: "Bilingue" },
                    { nom: "Anglais", niv: "Niveau scolaire" },
                    { nom: "Espagnol", niv: "Niveau scolaire" }
                ],
                experiences: [
                    {
                        titre: "Chargé de mission", entreprise: obtenirAleatoire(banque_entreprises, 1)[0],
                        date: "12/12/2025", taches: ["Lancement complet d'une marque", "Community manager : gestion des réseaux sociaux"]
                    },
                    {
                        titre: "Assistant support", entreprise: obtenirAleatoire(banque_entreprises, 1)[0],
                        date: "12/12/2024", taches: ["Salons / Forums", "Organisation des visites"]
                    },
                    {
                        titre: "Technicien", entreprise: obtenirAleatoire(banque_entreprises, 1)[0],
                        date: "10/10/2023", taches: ["Réalisation plaquette commerciale", "Interviews sur le terrain"]
                    }
                ],
                formations: [
                    { date: "2022", diplome: "Master spécialisé", ecole: obtenirAleatoire(banque_ecoles, 1)[0] },
                    { date: "2020", diplome: "Licence générale", ecole: obtenirAleatoire(banque_ecoles, 1)[0] },
                    { date: "2019", diplome: "BTS Technique", ecole: obtenirAleatoire(banque_ecoles, 1)[0] },
                    { date: "2017", diplome: "Bac scientifique", ecole: "Lycée Général" }
                ]
            };
        });

        // Éléments du DOM
        const conteneur_cartes = document.getElementById('conteneur_cartes');
        const arriere_plan_cv = document.getElementById('arriere_plan_cv');
        const bouton_fermer_cv = document.getElementById('bouton_fermer_cv');
        
        // Générer le carrousel horizontal (de gauche à droite)
        function generer_cartes() {
            liste_personnes.forEach(personne => {
                const carte = document.createElement('div');
                carte.classList.add('carte_personne');
                carte.innerHTML = `
                    <img src="${personne.image}" alt="Photo de ${personne.nom}" class="image_profil">
                    <h3 class="nom_personne">${personne.nom}</h3>
                    <span class="profession_carte">${personne.profession}</span>
                `;
                carte.addEventListener('click', () => afficher_cv(personne));
                conteneur_cartes.appendChild(carte);
            });
        }

        // Défilement avec la molette
        conteneur_cartes.addEventListener('wheel', (evt) => {
            if (evt.deltaY != 0) {
                evt.preventDefault();
                conteneur_cartes.scrollLeft += evt.deltaY * 2;
            }
        });

        // Afficher CV style Image
        function afficher_cv(personne) {
            document.getElementById('cv_image').src = personne.image;
            document.getElementById('cv_nom').textContent = personne.nomComplet;
            document.getElementById('cv_profession').textContent = personne.profession;
            document.getElementById('cv_email').textContent = personne.email;
            document.getElementById('cv_telephone').textContent = personne.telephone;
            document.getElementById('cv_profil_texte').textContent = personne.profil_texte;
            
            // Formations
            document.getElementById('conteneur_formations').innerHTML = personne.formations.map(f => `
                <div class="item_formation">
                    <strong>${f.date}</strong>
                    <span>- ${f.diplome} - <span class="ecole">${f.ecole}</span></span>
                </div>
            `).join('');

            // Expériences
            document.getElementById('conteneur_experiences').innerHTML = personne.experiences.map(exp => `
                <div class="item_experience">
                    <div class="date_entreprise_exp">
                        <p class="date_exp">${exp.date}</p>
                        <p class="entreprise_exp">${exp.entreprise}</p>
                    </div>
                    <div class="details_exp">
                        <p class="titre_poste_exp">${exp.titre}</p>
                        <ul class="liste_taches">
                            ${exp.taches.map(t => `<li>${t}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `).join('');

            // Langues
            document.getElementById('conteneur_langues').innerHTML = personne.langues.map(l => `
                <div class="comp_nom">${l.nom}</div>
                <div class="comp_valeur">: ${l.niv}</div>
            `).join('');

            // Logiciels
            document.getElementById('conteneur_logiciels').innerHTML = personne.logiciels.map(log => `
                <li>${log}</li>
            `).join('');

            arriere_plan_cv.classList.add('actif');
        }

        bouton_fermer_cv.addEventListener('click', () => arriere_plan_cv.classList.remove('actif'));
        arriere_plan_cv.addEventListener('click', (e) => {
            if (e.target === arriere_plan_cv) arriere_plan_cv.classList.remove('actif');
        });

        generer_cartes();