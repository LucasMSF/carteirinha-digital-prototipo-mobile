"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StudentCard from '@/components/StudentCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function StudentCardPage() {
  const [currentView, setCurrentView] = useState<'card' | 'profile'>('card');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verificar se o usuário está autenticado
    const authStatus = localStorage.getItem('isAuthenticated');
    
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    } else {
      // Redirecionar para login se não estiver autenticado
      router.push('/login');
      return;
    }
    
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('studentRA');
    router.push('/login');
  };

  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Componente não renderiza se não estiver autenticado
  }

  const studentData = {
    name: "Ana Carolina Silva",
    studentId: "202123456",
    course: "Engenharia de Computação",
    validUntil: "31/12/2024",
    profileImage: "https://placehold.co/150x150?text=Estudante+Profile+photo",
    universityLogo: "https://placehold.co/200x100?text=Universidade+Logo",
    university: "Universidade Federal do Brasil"
  };

  const additionalInfo = {
    email: "ana.silva@estudante.ufb.br",
    phone: "(11) 99999-9999",
    address: "Rua das Flores, 123 - São Paulo, SP",
    semester: "8º Semestre",
    status: "Matriculado",
    entryYear: "2021"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBackToDashboard}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            ← Voltar
          </Button>
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-800">Carteirinha Digital</h1>
            <p className="text-xs text-gray-600">Universidade Federal do Brasil</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Sair
          </Button>
        </div>
      </header>

      <div className="p-4">

      {/* Navigation Tabs */}
      <Tabs value={currentView} onValueChange={(value) => setCurrentView(value as 'card' | 'profile')} className="w-full max-w-md mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="card">Carteirinha</TabsTrigger>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
        </TabsList>

        {/* Carteirinha View */}
        <TabsContent value="card" className="space-y-4">
          <StudentCard {...studentData} />
          
          {/* Action Buttons */}
          <div className="flex flex-col gap-2 max-w-sm mx-auto">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Compartilhar Carteirinha
            </Button>
            <Button variant="outline" className="w-full">
              Baixar PDF
            </Button>
          </div>
        </TabsContent>

        {/* Profile View */}
        <TabsContent value="profile" className="space-y-4">
          <Card className="max-w-sm mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-lg">Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center mb-4">
                <img
                  src={studentData.profileImage}
                  alt="Foto do estudante"
                  className="w-20 h-20 rounded-full mx-auto mb-2 border-2 border-gray-200"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/150x150?text=Estudante+Profile+photo";
                  }}
                />
                <h3 className="font-semibold text-gray-800">{studentData.name}</h3>
                <p className="text-sm text-gray-600">{studentData.studentId}</p>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                  <p className="text-sm font-medium">{additionalInfo.email}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Telefone</p>
                  <p className="text-sm font-medium">{additionalInfo.phone}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Curso</p>
                  <p className="text-sm font-medium">{studentData.course}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Semestre</p>
                  <p className="text-sm font-medium">{additionalInfo.semester}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Ano de Ingresso</p>
                  <p className="text-sm font-medium">{additionalInfo.entryYear}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Status</p>
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                    {additionalInfo.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Actions */}
          <div className="flex flex-col gap-2 max-w-sm mx-auto">
            <Button variant="outline" className="w-full">
              Editar Perfil
            </Button>
            <Button variant="outline" className="w-full">
              Alterar Foto
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-around max-w-md mx-auto">
          <Button 
            variant={currentView === 'card' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setCurrentView('card')}
            className="flex-1 mx-1"
          >
            Carteirinha
          </Button>
          <Button 
            variant={currentView === 'profile' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setCurrentView('profile')}
            className="flex-1 mx-1"
          >
            Perfil
          </Button>
        </div>
      </div>
      </div>
    </div>
  );
}
