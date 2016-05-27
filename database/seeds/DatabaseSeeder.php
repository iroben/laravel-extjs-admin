<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->call(AdminUserSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(OperationSeeder::class);
        $this->call(App1TestSeeder::class);
        $this->call(App2TestSeeder::class);
    }
}
