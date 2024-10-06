# PROYECTO DE NEXT USANDO INTERNACIONALIZACIÓN

## PRIMER PASO
Instalar dependencia ``npm install next-intl``
## SEGUNDO PASO
Configurar en el archivo next.config.mjs
``` import createNextIntlPlugin from "next-intl/plugin";
/** @type {import('next').NextConfig} */
const nextIntl = createNextIntlPlugin();
const nextConfig = {};

export default nextIntl(nextConfig) 
```
## TERCER PASO
Al mismo nivel de la carpeta app
Crear una carpeta __i18n__
```
mkdir i18n
```

## CUARTO PASO
Crear un archivo dentro de la carpeta 
__i18n__ request.ts
```
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async()=>{
    const cookieStore = cookies();
    const locale:string = cookieStore.get("locale")?.value || "en"; 

    return{
        locale, 
        messages: (await import(`../locales/${locale}.json`)).default
    }
})
```

## QUINTO PASO
Crear en la carpeta raiz una carpeta messages o locales. Este nombre puede ser cualquiera de tu preferencia. Sin embargo, es necesario que cambies el nombre en la propiedad messages que retornas en la funcion __getRequestConfig__ del archivo __request.ts__

## SEXTO PASO
En la carpeta locales, puedes crear todos los json de cada lenguage. Por ejemplo: 
```
en.json
es.json
fr.json
...
```

En cada uno la propiedad debe tener el mismo nombre, el valor es el que cambia. Por ejemplo:
```
en.json: 
{
    "HomeView": {
        "title": "Home",
        "description" :"This is the home page" 
    }
}

es.json:
{
    "HomeView": {
        "title": "Inicio",
        "description" :"Esta es la página de inicio" 
    }
}

```
## SÉPTIMO PASO
En el archivo __layout.tsx,__ importa 
```
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
```
Las dos funciones __getMessages__ y __getLocale__ son asíncronas, debido a esto, el layout debe ser __async__

```
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

## OCTAVO PASO
En el archivo __page.tsx__ o las páginas que quieras hacer las traducciones, se debe seguir lo siguiente 

## NOVENO PASO
Crear un componente select o cada botón para crear el 
swith de intercambio de lenguaje

### INSTALA LA DEPENDENCIA JS-COOKIE 
Para guardar el estado y mantener una permanencia con este, es neceario instalar __js-cookie__ y guardar la propiedad locale que contiene los lenguages: en, es, fr, ...
```
npm install js-cookie
npm install @types/js-cookie
```

## COPIA EL CÓDIGO DEL COMPONENTE Y ESTUDIA EL FLUJO
```
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
export default function SwithLanguage(): React.ReactElement{
    const router = useRouter();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        Cookie.set("locale", event.target.value);
        router.refresh();
    }
    return (
        <select name="select-language" onChange={handleChange}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
        </select>
    )
}
```

## NOTA:
Cualquier inquietud me escribes...
