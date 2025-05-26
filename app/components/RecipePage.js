'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

export default function RecipePage() {
  const [search, setSearch] = useState('');

  const fetchRecipes = async () => {
    const endpoint = search
      ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      : `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
    const res = await axios.get(endpoint);
    return res.data.meals || [];
  };

  const { data: recipes = [], isLoading, error } = useQuery({
    queryKey: ['recipes', search],
    queryFn: fetchRecipes,
    keepPreviousData: true,
  });

  return (
    <div className="mt-10 px-2 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-teal-600 flex justify-center items-center gap-2">
        <RestaurantMenuIcon className="text-4xl text-teal-600" />
        Recipe Book
      </h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search recipes by name..."
          className="w-full max-w-md px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {isLoading && <p className="text-center text-gray-500">Loading recipes...</p>}
      {error && <p className="text-center text-red-500">Failed to load recipes.</p>}

      {!isLoading && recipes.length === 0 && (
        <p className="text-center text-gray-500">No recipes found.</p>
      )}

      {!isLoading && recipes.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="text-left px-4 py-2">Image</th>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Ingredients</th>
                <th className="text-left px-4 py-2">Instructions</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((recipe) => (
                <tr key={recipe.idMeal} className="border-t hover:bg-gray-50 transition duration-200">
                  <td className="px-4 py-2">
                    <img
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      className="w-20 h-20 rounded-md object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 font-semibold text-teal-700">{recipe.strMeal}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {Array.from({ length: 5 })
                      .map((_, i) => recipe[`strIngredient${i + 1}`])
                      .filter(Boolean)
                      .join(', ')}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {recipe.strInstructions?.slice(0, 100)}...
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
