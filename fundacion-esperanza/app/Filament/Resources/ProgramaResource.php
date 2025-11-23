<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProgramaResource\Pages;
use App\Filament\Resources\ProgramaResource\RelationManagers;
use App\Models\Programa;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\FileUpload; 
use Filament\Forms\Components\RichEditor; 
use Filament\Forms\Components\TextInput;

class ProgramaResource extends Resource
{
    protected static ?string $model = Programa::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
        ->schema([
            TextInput::make('nombre') 
                ->label('Título')
                ->required(),
            
            FileUpload::make('imagen') 
                ->label('Imagen')
                ->image()
                ->directory('programas')
                ->columnSpanFull(),
            Select::make('color')
                ->label('Color de Fondo')
                ->options([
                    'bg-celeste-fondo' => 'Celeste',
                    'bg-verde-lima' => 'Verde',
                    'bg-amarillo-detalle' => 'Amarillo',
                    'bg-rosa-principal' => 'Rosa',
                ])
                ->required(),
            RichEditor::make('descripcion') 
                ->label('Descripción')
                ->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                //
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProgramas::route('/'),
            'create' => Pages\CreatePrograma::route('/create'),
            'edit' => Pages\EditPrograma::route('/{record}/edit'),
        ];
    }
}
