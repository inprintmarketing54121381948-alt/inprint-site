import type { Schema, Struct } from '@strapi/strapi';

export interface ConsultoriaPresenteado extends Struct.ComponentSchema {
  collectionName: 'components_consultoria_presenteados';
  info: {
    description: 'Perfil e quantidade de um grupo de presenteados (repet\u00EDvel no formul\u00E1rio de consultoria)';
    displayName: 'Grupo de presenteados';
  };
  attributes: {
    quantidade: Schema.Attribute.String;
    tipo: Schema.Attribute.String;
  };
}

export interface OrcamentoItem extends Struct.ComponentSchema {
  collectionName: 'components_orcamento_itens';
  info: {
    description: 'Um produto dentro de um pedido de or\u00E7amento consolidado (fluxo 2 do planejamento)';
    displayName: 'Item de or\u00E7amento';
  };
  attributes: {
    codigo: Schema.Attribute.String;
    imagemUrl: Schema.Attribute.String;
    nome: Schema.Attribute.String & Schema.Attribute.Required;
    observacaoPersonalizacao: Schema.Attribute.Text;
    produtoId: Schema.Attribute.Integer;
    quantidade: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'consultoria.presenteado': ConsultoriaPresenteado;
      'orcamento.item': OrcamentoItem;
    }
  }
}
