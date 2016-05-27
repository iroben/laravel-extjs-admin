<?php

use App\Models\App1\Test1Model;
use Illuminate\Database\Seeder;

class App1TestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        for ($i = 1; $i < 11; ++$i) {
            Test1Model::create([
                'username1' => 'username1_' . $i,
                'age1'      => 20 + $i,
                'sex1'      => rand(1, 2)
            ]);
        }
    }
}
