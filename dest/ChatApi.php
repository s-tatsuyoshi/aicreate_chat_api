<?php
require __DIR__ . "/vendor/autoload.php";
use Carbon\Carbon;
use Dotenv\Dotenv;
const TOKENPATH =  '/home/aicreate1954/ai-create.net/env/chatwork/';

$dotenv = Dotenv::createImmutable(TOKENPATH);
$dotenv->load();
$token = $_ENV['RPA_TOKEN'];
$today = Carbon::now();
$start_of_month = Carbon::now()->startOfMonth();
if($start_of_month == $today){
  $accout_ids = [2157434,2458725,3056863,4139020];
} else {
  $accout_ids = [2157415,3324425,2447973,4205422,6632060];
}
$roomid = 66962415;
$url = 'https://api.chatwork.com/v2/rooms/'.$roomid.'/messages';
$message = '[hr]';
foreach($accout_ids as $accout_id){
  $message.= '[To:'.$accout_id.'][pname:'.$accout_id.']さん'."\n";
}
$message.= 'Instagram、Twitterにて'."\n";
$message.= '自分のお客様に「いいね！」を押そう！'."\n";
$message.= '信頼と情報をゲットしましょう！！'."\n";
header('Content-type: application/json; charset=utf-8');
$data = [
  'body' => $message,
];
$option = [
  CURLOPT_URL => $url,
  CURLOPT_HTTPHEADER => [
    'X-ChatWorkToken: '.$token,
  ],
  CURLOPT_POST => true,
  CURLOPT_POSTFIELDS => http_build_query($data),
  CURLOPT_RETURNTRANSFER => true,
];
$ch = curl_init();
curl_setopt_array($ch, $option);
$response = curl_exec($ch);
curl_close($ch);

$result = json_decode($response);
