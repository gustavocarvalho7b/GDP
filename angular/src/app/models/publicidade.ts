import { Estados } from './estados';

export interface Publicidade {
  id?: number;
  titulo: string;
  descricao: string;
  botao_link: string;
  titulo_botao_link: string;
  dt_inicio: Date;
  dt_fim: Date;
  imagem_base64: string;
  id_publicidade_estado: number[];
  cad_estados?: Estados[];
  padrao?: boolean;
}
