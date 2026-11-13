<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Produto;

/**
 * Controller responsável pela listagem e pelo detalhe das categorias.
 */
class CategoriaController extends Controller
{
    /**
     * GET /categorias
     * Lista as categorias em ordem crescente de ID.
     */
    public function index()
    {
        $categorias = Categoria::orderBy('id')->get();

        return view('categorias.index', [
            'categorias' => $categorias,
        ]);
    }

    /**
     * GET /categorias/{id}
     * Exibe uma categoria e os produtos associados ao nome dela.
     * findOrFail retorna HTTP 404 automaticamente quando o ID não existe.
     */
    public function show(int $id)
    {
        $categoria = Categoria::findOrFail($id);

        $produtos = Produto::where('categoria', $categoria->nome)->get();

        return view('categorias.show', [
            'categoria' => $categoria,
            'produtos' => $produtos,
        ]);
    }
}
