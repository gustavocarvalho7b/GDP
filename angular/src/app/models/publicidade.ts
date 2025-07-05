import { Estados } from './estados';

export interface Publicidade {
  id?: number;
  titulo: string;
  descricao: string;
  botao_link: string;
  titulo_botao_link: string;
  dt_inicio: Date;
  dt_fim: Date;
  id_publicidade_estado: number[];
  imagem_base64: string;
  cad_estados?: Estados[];
}
