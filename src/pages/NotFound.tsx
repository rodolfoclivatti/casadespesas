import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "Erro 404: O usuário tentou acessar uma rota inexistente:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-6xl font-bold text-rose-600 mb-4">404</h1>
        <p className="text-xl text-slate-600 mb-6 font-medium">Ops! Página não encontrada</p>
        <p className="text-slate-500 mb-8">A página que você está procurando não existe ou foi movida.</p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center px-6 py-3 bg-rose-600 text-white font-semibold rounded-full hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200"
        >
          Voltar para o Início
        </a>
      </div>
    </div>
  );
};

export default NotFound;