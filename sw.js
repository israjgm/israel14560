
const CACHE_NAME_CORE='CACHE-V1',
const CACHE_FILES_CORE=[

"src/images/icons/icon-144x144.png",
"src/css/app.css",
"src/js/app.js",
"src/images/computer.jpg",
"index.html",
"/"
  
];

const CACHE_NAME_DYNAMIC='dynamic-v1';

const CACHE_NAME_INMUTABLE='inmutable-v1';
const CACHE_FILES_INMUTABLR=[
  
"https://fonts.googleapis.com/icon?family=Material+Icons",
"https://code.getmdl.io/1.3.0/material.indigo-pink.min.css",
"https://code.getmdl.io/1.3.0/material.min.js",  
"https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2",
"https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
"https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
"https://unpkg.com/pwacompat"

]


self.addEventListener('install', (event)=>{
  const guardandoCache=caches.open(CACHE_NAME_CORE)
      .then (cache =>cache.addAll(CACHE_FILES_CORE))
      .catch(err=>console.error(err.message));

      const guardandoCacheInmutable=caches.open(CACHE_NAME_INMUTABLE)
      .then (cache =>cache.addAll(CACHE_FILES_INMUTABLE))
      .catch(err=>console.error(err.message));


  self.skipWaiting();
  event.waitUntil(Promise.all([guardandoCache,guardandoCacheInmutable]));
});
  

self.addEventListener('active', (event)=> {
  //Eliminando caches obsoletos
const obtenerCaches=caches.keys()
   .then(allCaches=>allCaches.filter(cache=> ![CACHE_NAME_CORE,
       CACHE_NAME_INMUTABLE,CACHE_NAME_DYNAMIC].includes(cache)).filter(cacheName
           =>caches.delete(cacheName)))
   .catch(err=> console.error(err.message))
   console.info("Cache Limpiado exitosamente");
   event.waitUntil(obtenerCaches);

 
});
//intercepta peticiones
self.addEventListener('fetch',  (event)=>{
  const soloCache=caches.match(event.request);
  event.respondWith(soloCache);
});

//sincroniza cuando no hay conexion a internet
self.addEventListener('sync',  (event)=>{
  console.log(event);
});

self.addEventListener('push',  (event)=>{
  console.error(event);
});