import subprocess
import os

def git_push_automation(repo_path, commit_message="Mise à jour automatique"):
    try:
        if not os.path.exists(repo_path):
            print(f"Erreur : Le dossier {repo_path} n'existe pas.")
            return

        os.chdir(repo_path)
        
        # On vérifie s'il y a des changements avant de continuer
        status = subprocess.run(['git', 'status', '--porcelain'], capture_output=True, text=True).stdout
        
        if not status:
            print("Rien à sauvegarder : le dossier est déjà à jour.")
            return

        # S'il y a des changements, on lance la suite
        subprocess.run(['git', 'add', '.'], check=True)
        subprocess.run(['git', 'commit', '-m', commit_message], check=True)
        subprocess.run(['git', 'push'], check=True)
        
        print(f"--- Succès ! Modifications envoyées pour {os.path.basename(repo_path)} ---")

    except subprocess.CalledProcessError as e:
        print(f"Erreur Git : {e}")

# Utilisation avec ton chemin spécifique
chemin = r"C:\Users\lucas\Documents\Gweb.js" 
git_push_automation(chemin, "Mise à jour automatique")