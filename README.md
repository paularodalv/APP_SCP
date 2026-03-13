# APP_SCP
Aplicación creada con IA del curso Aula-Empresa

#Como ejecutarlo:

¡¡NOTA: se debe ejecutar en CMD, PowerShell o la Terminal !!

Para poder ejecuar la aplicación, debes abrir la terminal e ir a la carpeta del proyecto, claramente después de descargarlo. Debemos de instalar las dependencias (npm install) y después hacer el comando "node app.js".

Si todo está bien, en la misma terminal podrás ver que el servidor está en http://localhost:300. Una vez esté funcionando podemos abrir el localhost en nuestro navegador y podemos ir a: 

http://localhost:3000/register.html --> Para registrarnos
http://localhost:3000/login.html --> Para iniciar sesión

Después de hacer el login, nos llevará al muro público donde podemos publicar mensajes.

EN CASO DE HACERLO CON DOCKER:

Primero debemos hacer los comandos "docker build -t APP_SCP" y después "docker run -p 3000:3000 APP_SCP". Por útlimo en el navegador podremos abrir "hhtp://localhost:300"
