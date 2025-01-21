// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import colors from 'vuetify/util/colors'
// Translations provided by Vuetify
import { es } from 'vuetify/locale'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi', // This is already the default value - only for display purposes
        aliases,
        sets: {
            mdi,
        },
    },
    theme: {
        defaultTheme: 'dark',
        themes: {
            light: {
                dark: false,
                colors: {
                    background: '#eceff1',
                    surface: '#eceff1',
                    primary: colors.cyan.darken1,
                    secondary: '#3281c1',
                    error: '#fb977d',
                    info: '#899dad',
                    success: '#4bd08b',
                    warning: '#f8c076',
                },
            },
            dark: {
                dark: true, //4e515c, 3c3d50
                colors: {
                    background: '#3c3d50',
                    surface: '#3c3d50',
                    primary: 'b5e6db',
                    secondary: '#3281c1',
                    error: '#fb977d',
                    info: '#899dad',
                    success: '#4bd08b',
                    warning: '#f8c076',
                },
            }
        },
    },
    locale: {
        locale: 'es',
        fallback: 'en',
        messages: { es },
    },
})

export default vuetify