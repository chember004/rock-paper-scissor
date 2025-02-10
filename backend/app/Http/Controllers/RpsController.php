<?php

namespace App\Http\Controllers;

use Brick\Math\BigInteger;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RpsController extends Controller
{
    private int $selected = 0;
    private int $totalMatchesPlayed = 10;
    private int $totalWins = 0;
    private int $totalTies = 0;
    private int $totalLoss = 0;
    private float $winPercentage = 0.0;
    private $items;
    public function store(Request $request)
    {
        try {
            $this->selected = $request->selected();
            $this->items = $request->items();
            $this->picker();
        } catch (Exception $e) {
            return response()->json([
                'data' => [],
                'message'=>$e->getMessage()
            ], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'data' => [
                'totalMatchesPlayed'=> $this->totalMatchesPlayed,
                'totalWins'=> $this->totalWins,
                'totalTies'=> $this->totalTies,
                'winPercentage'=> $this->winPercentage,
            ],
            'message' => 'Succeed'
        ], JsonResponse::HTTP_OK);
    }

    public function picker() {
        if ($this->selected == 0) {
            $randomSelected = rand(0,count($this->items) -1);
            for ($i=1; $i < 10 ; $i++) { 
                $move = rand(0,count($this->items) -1);
                $this->rfsChecker($this->items[$randomSelected]->strength ,$this->items[i]->strength);
            }
        } else {
            for ($i=1; $i < 10 ; $i++) { 
                $move = rand(0,count($this->items) -1);
                $this->rfsChecker($this->selected ,$this->items[i]->strength);
            }
        }
    }

    public function rfsChecker($val,$val2) {
        if($val > $val2){
            $this->totalWins = $this->totalWins + 1;
        } else if($val < $val2){
            $this->totalLoss = $this->totalLoss + 1;
        } else {
            $this->totalTies = $this->totalTies + 1;
        }
    }

    public function rfsWinPercentage() {
        $this->winPercentage = ($this->totalWins + (0.5 * $this->totalTies)) / $this->totalMatchesPlayed;
    }

}
