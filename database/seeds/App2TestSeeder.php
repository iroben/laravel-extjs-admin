<?php

use App\Models\App2\Test2Model;
use Illuminate\Database\Seeder;

class App2TestSeeder extends Seeder
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
            Test2Model::create([
                'username2' => 'username2_' . $i,
                'age2'      => 20 + $i,
                'sex2'      => rand(1, 2)
            ]);
        }
    }
}
