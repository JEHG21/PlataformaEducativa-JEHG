export const NavigationMap = {
    navigation: {
        //Admin section and permissions
        // admin: {
        //     section: {
        //         id: "administration",
        //         title: "Administración",
        //         translate: "NAV.ADMIN.TITLE",
        //         type: "collapsable",
        //         icon: "verified_user",
        //         children: [],
        //     },
        //     companies: {
        //         id: "companies",
        //         title: "Companies",
        //         translate: "NAV.ADMIN.COMPANIES",
        //         type: "item",
        //         url: "/admin/companies",
        //     },
        //     roles: {
        //         id: "roles",
        //         title: "Roles",
        //         translate: "NAV.ADMIN.ROLES",
        //         type: "item",
        //         url: "/admin/roles",
        //     },
        //     users: {
        //         id: "users",
        //         title: "users",
        //         translate: "NAV.ADMIN.USERS",
        //         type: "item",
        //         url: "/admin/users",
        //     },
        // },
        // Customer section and permissions
        customer: {
            section: {
                id: "customer",
                title: "",
                translate: "NAV.CUSTOMER.TITLE",
                type: "group",
                children: [],
            },
            hash: {
                id: "hash",
                title: "Hash",
                translate: "NAV.CUSTOMER.HASH",
                type: "item",
                icon: "fingerprint",
            },
        },
        // navegacion modulo de administracion
        admin: {
            section: {
                id: 'admin',
                title: 'administration',
                translate: 'NAV.ADMIN.TITLE',
                type: 'collapsable',
                icon: 'admin_panel_settings',
                children: []
            },
            backusers: {
                id: "backusers",
                title: "Backend users",
                translate: "NAV.ADMIN.USERS",
                type: "item",
                url: "/admin/users",
            },
            roles: {
                id: "roles",
                title: "Roles",
                translate: "NAV.ADMIN.ROLES",
                type: "item",
                url: "/admin/roles",
            },
        },
        // navegacion modulo de token users
        tokenuser: {
            section: {
                id: 'tokenuser',
                title: 'Token user',
                translate: 'NAV.TOKENUSER.TITLE',
                type: 'collapsable',
                icon: 'person',
                children: []
            },
            users: {
                id: 'users',
                title: 'users',
                translate: 'NAV.TOKENUSER.USERS',
                type: 'item',
                // icon: 'view_list',
                url: "/tokenUsers/users",
            }
        },
        // navegacion modulo de asignacion de token
        assigntoken: {
            section: {
                id: 'assigntoken',
                title: 'Assign Token',
                translate: 'NAV.ASSIGNTOKEN.TITLE',
                type: 'collapsable',
                icon: 'edit',
                children: []
            },
            channels: {
                id: "channels",
                title: "Channels",
                translate: "NAV.ASSIGNTOKEN.CHANNELS",
                type: "item",
                url: "/assignToken/channels",
            },
            tokentypes: {
                id: "tokentypes",
                title: "Token types",
                translate: "NAV.ASSIGNTOKEN.TOKEN_TYPES",
                type: "item",
                url: "/assignToken/tokenTypes",
            },
            assigntokentypes: {
                id: "assigntokentypes",
                title: "Assign token types",
                translate: "NAV.ASSIGNTOKEN.ASSIGN_TOKEN_TYPES",
                type: "item",
                url: "/admin/roles1111111",
            },
        },
        home: {
            section: {
                id: 'home',
                title: 'Configuration webservice',
                translate: 'NAV.CONFIGWS.TITLE',
                type: 'collapsable',
                icon: 'build',
                children: []
            },
            inicio: {
                id: "inicio",
                title: "Inicio",
                translate: "NAV.CONFIGWS.VALIDATION",
                type: "item",
                url: "/home/inicio",
            },
            email: {
                id: "email",
                title: "Email",
                translate: "NAV.CONFIGWS.EMAIL",
                type: "item",
                url: "/configuration-ws/email",
            },
            sms: {
                id: "secret",
                title: "Secret",
                translate: "NAV.CONFIGWS.SECRET",
                type: "item",
                url: "/configuration-ws/secret",
            },
            expiration: {
                id: "expiration",
                title: "Expiration",
                translate: "NAV.CONFIGWS.EXPIRATION",
                type: "item",
                url: "/configuration-ws/expiration",
            },
            otp: {
                id: "otp",
                title: "OTP",
                translate: "NAV.CONFIGWS.OTP",
                type: "item",
                url: "/configuration-ws/otp",
            },
        },
        logs: {
            section: {
                id: 'logs',
                title: 'Logs',
                translate: 'NAV.LOGS.TITLE',
                type: 'collapsable',
                icon: 'dashboard', //assessment, auto_stories, apps
                children: []
            },
            generation: {
                id: "generation",
                title: "Generation",
                translate: "NAV.LOGS.GENERATION",
                type: "item",
                url: "/admin/444",
            },
            validation: {
                id: "logvalidation",
                title: "validation",
                translate: "NAV.LOGS.VALIDATION",
                type: "item",
                url: "/admin/44",
            },
            cache: {
                id: "cache",
                title: "Cache",
                translate: "NAV.LOGS.CACHE",
                type: "item",
                url: "/admin/44",
            },
            general: {
                id: "general",
                title: "General",
                translate: "NAV.LOGS.GENERAL",
                type: "item",
                url: "/admin/44",
            },
            administrative: {
                id: "administrative",
                title: "Administrative",
                translate: "NAV.LOGS.ADMINISTRATIVE",
                type: "item",
                url: "/admin/444",
            },
        }
    },
    permissions: {
        roles: "DSToken.Console:Rol:List",
        companies: "DSToken.Console:Company:List",
        users: "DSToken.Console:User:List",
    },
    routes: {
        //admin
        "admin/roles": "DSToken.Console:Rol:List",
        "admin/roles/:id": "DSToken.Console:Rol:List",
        "admin/users": "DSToken.Console:User:List",
        "admin/users/:id": "DSToken.Console:User:List",
        "admin/users/new": "DSToken.Console:User:Create",
        "admin/companies": "DSToken.Console:Company",
        "admin/custom-rules": "DSToken.Console:CustomRules:List",
    },
};
