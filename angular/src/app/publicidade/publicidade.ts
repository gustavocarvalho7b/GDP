export interface Estado {
  id: number;
  descricao: string;
  sigla: string;
}

export interface Publicidade {
  id: number;
  titulo: string;
  descricao: string;
  botao_link: string;
  titulo_botao_link: string;
  dt_inicio: Date;
  dt_fim: Date;
  estados?: Estado[];
}

export interface PublicidadeEstado {
  id: number;
  id_estado: number;
  id_publicidade: number;
}
