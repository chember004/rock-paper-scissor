<?php

namespace App\Http\Controllers;

use Brick\Math\BigInteger;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RpsController extends Controller
{
    private string $selected;
    private int $totalMatchesPlayed = 10;
    private int $totalWins = 0;
    private int $totalTies = 0;
    private int $totalLoss = 0;
    private float $winPercentage = 0.0;
    private $items;
    public function store(Request $request)
    {
        try {
            $this->selected = $request->input('selected');
            $this->items = $request->input('items');
            // error_log( "test");
            // error_log( $this->selected);
            $this->picker();
            $this->rpsWinPercentage();
        } catch (Exception $e) {
            return response()->json([
                'data' => [],
                'message'=>$e->getMessage()
            ], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'data' => [
                'totalNumPlayed'=> $this->totalMatchesPlayed,
                'totalNumWins'=> $this->totalWins,
                'totalNumTies'=> $this->totalTies,
                'winPercentage'=> $this->winPercentage,
                'testSelected' =>  $this->selected,
                'testItems' =>  $this->items
            ],
            'message' => 'Succeed'
        ], JsonResponse::HTTP_OK);
    }

    public function picker(): void {
        if ($this->selected == "random") {
            $randomSelected = rand(0,sizeof($this->items)-1);
            for ($i=0; $i < 10 ; $i++) { 
                $move = rand(0,sizeof($this->items)-1);
                $this->rpsChecker($this->items[$randomSelected]['id'] ,$move);
            }
        } else {
            for ($i=0; $i < 10 ; $i++) { 
                $move = rand(0,sizeof($this->items)-1);
                // error_log( "move");
                // error_log($move);
                // error_log($this->selected );
                $this->rpsChecker($this->selected ,$move);
            }
        }
    }

    public function rpsChecker($val,$val2): void {
        // error_log( "val");
        // error_log( $val);
        $selectedData = $this->getItem($val);
        $randomItem = $this->items[$val2]['id'];
        // error_log("randomItem");
        // error_log($randomItem);
        $isStrength = $this->checkIfExist($randomItem, $selectedData['strengths']);
        $isWeakness = $this->checkIfExist($randomItem, $selectedData['weaknesses']);
        error_log( "isStrength-2");
        error_log( $isStrength);
        error_log( "isWeakness-2");
        error_log( $isWeakness);
    if($val === $randomItem){
        $this->totalTies = $this->totalTies + 1;
    }
     if($isStrength == true && $isWeakness == false ){
            $this->totalWins = $this->totalWins + 1;
        } else if($isWeakness == true && $isStrength == false){
            $this->totalLoss = $this->totalLoss + 1;
        } else {
            $this->totalTies = $this->totalTies + 1;
        }
    }

    public function rpsWinPercentage(): void {
        $this->winPercentage = ($this->totalWins + (0.5 * $this->totalTies)) / $this->totalMatchesPlayed;
    }

    public function checkIfExist($val, $arr): bool {
        foreach ($arr as $key => $value) {
           if( $value == $val ) {
            // error_log($val);
            // error_log($value);
            return true;
           }
        }
        return false;
    }

    public function getItem($val) {
        foreach ($this->items as $key => $value) {
           if( $value['id'] == $val) {
            // error_log($val);
            // error_log($value['id']);
            return $value;
           }
        }

    }

}
