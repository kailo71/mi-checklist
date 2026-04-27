# Guía: Subir tu Checklist como PWA desde el celular

Tiempo total: 10-15 minutos. No necesitas instalar nada.

---

## Paso 1: Crear cuenta en GitHub (saltar si ya tienes)

1. Abre el navegador y ve a **github.com**
2. Toca "Sign up"
3. Crea una cuenta con tu email
4. Verifica el email

---

## Paso 2: Crear el repositorio y subir los archivos

1. Una vez dentro de GitHub, toca el **"+"** arriba a la derecha → **"New repository"**
2. Nombre del repo: `mi-checklist`
3. Marcalo como **Public**
4. **NO** marques "Add a README file"
5. Toca **"Create repository"**

Ahora vas a ver una página con instrucciones. Ignóralas, vamos a usar la opción más fácil:

6. En la misma página, busca el link **"uploading an existing file"** (está en el texto que dice "or...")
7. Toca ahí
8. Verás una pantalla para arrastrar archivos. En el celular, toca **"choose your files"**

**Aquí viene lo importante:**

9. Descomprime el archivo `checklist-pwa.zip` que te paso (apps como ZArchiver o el explorador de archivos lo hacen)
10. Sube **TODO** el contenido descomprimido (todos los archivos y la carpeta `src` y `public`)
11. Abajo, en "Commit changes", toca **"Commit changes"**

---

## Paso 3: Conectar Vercel (publica la app gratis)

1. Ve a **vercel.com** en el navegador
2. Toca **"Sign Up"**
3. Elige **"Continue with GitHub"** (te conecta automáticamente)
4. Autoriza el acceso

Una vez dentro:

5. Toca **"Add New..."** → **"Project"**
6. Verás tu repo `mi-checklist` en la lista. Toca **"Import"**
7. En la pantalla de configuración, **NO cambies nada**, solo toca **"Deploy"**
8. Espera 1-2 minutos mientras compila

Cuando termine, te muestra **un link** del estilo `mi-checklist-xxx.vercel.app`. ¡Esa es tu app!

---

## Paso 4: Instalar la PWA en tu celular

1. Abre el link de Vercel en **Chrome** (importante que sea Chrome)
2. La app se ve y funciona
3. Toca el menú de Chrome (3 puntos arriba a la derecha)
4. Busca **"Instalar app"** o **"Agregar a pantalla de inicio"**
5. Confirma

¡Listo! Ahora tu checklist aparece como una app normal en tu pantalla de inicio, con su icono y todo. Funciona offline y guarda tus tareas.

---

## Para hacer cambios después

Cualquier cambio que subas a GitHub, Vercel lo publica automáticamente en segundos. Solo tienes que:

1. Editar el archivo en GitHub (cada archivo tiene un botón de lápiz para editar online)
2. Guardar el cambio
3. Esperar 30-60 segundos y refrescar tu app

---

## Si algo sale mal

**No me aparece "Instalar app" en Chrome**
→ Asegúrate que abriste el link `https://...vercel.app` y no estás en modo incógnito.

**La app aparece en blanco**
→ Espera 2 minutos más, Vercel a veces tarda en compilar la primera vez.

**No encuentro cómo descomprimir el ZIP en el celular**
→ Instala "Files by Google" desde Play Store, abre el ZIP y elige "Extraer".

**Los archivos no se suben todos juntos a GitHub**
→ GitHub permite multi-selección. Si tu navegador no, sube los archivos en grupos: primero todos los de la raíz, luego entras a `src` (lo creas como carpeta arriba a la derecha en GitHub) y subes los de `src`, igual con `public`.
