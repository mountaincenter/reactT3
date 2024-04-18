### 編集時のvalidationの実装イメージ

1. displayStartTime or displayStopTimeを押し下げる
2. 編集モードになり 押し下げた方がfocusされる
3. selectedStartTimeに入力して Enterを押下 or inputタグ以外をクリック or tabを押下 selectedStopTimeにfocusを変更する
4. selectedStopTimeに入力して Enterを押下 or inputタグ以外をクリック
   update.mutateにてtimeLogを登録し編集モードを終了する
   tabを押下 selectedStartTimeにfocusを変更する

備考: <br>・編集モードでは 既存の文字列をハイライトして文字入力がいわゆる上書きできる状態にする<br>
・1〜4を実装した後validationの実装（可能であればzodで実装予定）

5. updateStartTime は updateStopTimeより前の時間
6. inputStartTime,inputStopTimeの時間は3桁ないし4桁入力<br>
   3桁の場合<br>
   上1桁0〜9 下二桁00〜59<br>
   4桁の場合<br>
   updateStartTime: 上2桁 00〜23 下二桁00〜59<br>
   updateStopTime: 上2桁　00〜47 下二桁00〜59<br>
   備考：
   inputStopTimeを入力した後に表示されるdisplayStopTimeは以下のformatStopTimeWithDayExtensionと整合性をとれるようにしたいです

```javascript
export const fomatStopTimeWihtDayExtension = (
  startTime: Date,
  stopTime: Date,
): string => {
  const dayDifference = differenceInCalendarDays(stopTime, startTime);
  const hours = stopTime.getHours() + dayDifference * 24;
  const minutes = stopTime.getMinutes();

  return `${hours}:${String(minutes).padStart(2, "0")}`;
};
```

<hr>

### TODO

- [x] フォーカスとセレクト
- [] 入力フォームの実装 onSubmitが正常に機能する
- [] tabが効かなくなる問題を解決
- [] 入力フォームcontentオブジェクトとexample単体のEnterクリック時の挙動
- [] validationの実装(contentから単体でのvalidation)
- [] validationの実装(時間管理 開始時刻と終了時刻:複数の要素のvalidation)
- [] testが書けると良いですね
- [] 本体に実装
- 備考：できる限りbranchを活用すること

- [] 2要素をobject化してconsole.logで確認

- [] useState,useEffectを使って更新できるかどうか

- [] object化した2要素をtab及びenterで移動させる

- [] object化した2要素をtab及びenterで移動させsubmitで更新できるか

- [] object化した2要素をtab及びenterで移動させ最後の要素でenterを押下げるとsubmitで更新できる
