<?php

use App\Notifications\SelfNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('beams')->middleware('auth:sanctum')->group(function () {
    Route::post('/self-notification', function (Request $request) {
        $request->user()->notify(new SelfNotification(title: $request->title, message: $request->message));
        return response("Successfully sent SelfNotification", 200);
    });

    Route::get('/token', function (Request $request) {
        if (!config('services.pusher.beams_instance_id') || !config('services.pusher.beams_secret_key')) {
            return abort(501, "Sorry, beams credentials are not available in ENV file on this server.");
        }

        if ($request->user()->id != $request->user_id) {
            return response("Inconsistent request: user_id doesn't match your id", 401);
        }

        $beamsClient = new \Pusher\PushNotifications\PushNotifications([
                "instanceId" => config('services.pusher.beams_instance_id'),
                "secretKey" => config('services.pusher.beams_secret_key'),
        ]);

        $beamsToken = $beamsClient->generateToken((string) "App.Models.User.{$request->user()->id}");
        return Response::json($beamsToken);
    });
});

Route::get('/sites', function (Request $request) {
    $client = new GuzzleHttp\Client();
    $VITE_FORGE_SERVER_ID = env("VITE_FORGE_SERVER_ID");
    $VITE_FORGE_API_KEY = env("VITE_FORGE_API_KEY");
    $res = $client->request('GET', "https://forge.laravel.com/api/v1/servers/{$VITE_FORGE_SERVER_ID}/sites", [
        "headers" => [
			"Authorization" => "Bearer {$VITE_FORGE_API_KEY}",
			"Accept" => "application/json",
			"Content-Type" => "application/json",
        ]
    ]);
    return $res->getBody();
});
