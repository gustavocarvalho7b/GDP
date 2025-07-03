import { Estados } from './estados';

export interface Publicidade {
  id?: number;
  titulo: string;
  descricao: string;
  botao_link: string;
  titulo_botao_link: string;
  dt_inicio: Date;
  dt_fim: Date;
  cad_estados: Estados[];
  imagem_base64: string;
}
