[
{
id: 'clul1ppau0001xvcmqr4twlsw',
startTime: 2024-04-03T20:14:00.000Z,
stopTime: 2024-04-04T00:39:00.000Z,
recordTime: 25,
description: null,
category: null,
status: 'finished',
isActive: true,
createdAt: 2024-04-04T09:39:44.520Z,
userId: 'cluftuk4k00004sseyhnfx4bn'
}
]

updateの時に1.入力は

000 〜 959
0000 〜 4759
2.TableCell表示は
00:00 〜 09:59 とゼロ埋め
00:00 〜 47:59 と最大48時間表記
3.updateへは
startTime: 2024-04-03T20:14:00.000Z,
この元データの日付はそのまま 時間を
1で入力した時間を登録<br>
4.recordTimeは分単位での入力

```javascript
// ex: 2024-04-04T09:39:44.520Z
const RawDate: Date
// ex: 04/04(ゼロ埋めして mm/ddで表記)
const DisplayDate: string
// ex: 00:00 12:30 24:15 47:50
// (ゼロ埋めして最大48時間表記)
const DisplayTime: string
// ex: 000 459 1215 3539
// 3桁の場合　上1桁　0〜12 下2桁 00〜59
// 4桁の場合　上2桁 00〜47 下2桁 00〜59
const InputTime: string



```
