import type { Core } from '@strapi/strapi';

const allowedMediaTypes = [
  'image/*',
  'video/*',
  'audio/*',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.*',
  'text/plain',
  'text/csv',
];

const deniedExecutableTypes = [
  'application/vnd.microsoft.portable-executable',
  'application/x-msdownload',
  'application/x-msdos-program',
  'application/x-executable',
  'application/x-dosexec',
  'application/x-sh',
  'text/x-shellscript',
  'application/x-mach-binary',
];

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => {
  // Upload de logomarca (formulário de consultoria e página de produto) vai para
  // o Cloudflare R2 em produção — o container do Railway não persiste arquivos
  // locais entre deploys. Ver especificacao-tecnica.md, seção 1.
  // Sem essas env vars (dev local), cai no provider padrão (disco local).
  const r2Configurado = Boolean(env('R2_ACCESS_KEY_ID') && env('R2_BUCKET'));

  return {
    'users-permissions': {
      config: {
        jwtManagement: 'refresh',
        sessions: {
          httpOnly: true,
        },
      },
    },
    upload: {
      config: {
        ...(r2Configurado && {
          provider: '@strapi/provider-upload-aws-s3',
          providerOptions: {
            s3Options: {
              credentials: {
                accessKeyId: env('R2_ACCESS_KEY_ID'),
                secretAccessKey: env('R2_SECRET_ACCESS_KEY'),
              },
              endpoint: env('R2_ENDPOINT'),
              region: 'auto',
              params: { Bucket: env('R2_BUCKET') },
              forcePathStyle: true,
            },
          },
        }),
        security: {
          allowedTypes: allowedMediaTypes,
          deniedTypes: deniedExecutableTypes,
        },
      },
    },
  };
};

export default config;
