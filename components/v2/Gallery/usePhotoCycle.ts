import { useCallback, useEffect, useState } from "react";

// Which photo each gallery slot shows (MAR-54). Every slot keeps its own turn
// counter, advanced when its ghost animation finishes a cycle, and shows
// photos[(i + turn * slotCount) % photos.length].
//
// The slots are staggered by cycle / slotCount, so slot i's turn t lands at
// step i + t * slotCount of one shared sequence: the slots on screen always
// hold slotCount consecutive steps, and no two show the same photo as long
// as there are at least slotCount photos.
export const usePhotoCycle = (photos: string[], slotCount: number) => {
  const [turns, setTurns] = useState<number[]>(() => Array(slotCount).fill(0));

  const photoAt = useCallback(
    (slot: number, turn: number) =>
      photos.length ? photos[(slot + turn * slotCount) % photos.length] : null,
    [photos, slotCount]
  );

  const advance = useCallback((slot: number) => {
    setTurns((current) => {
      const next = current.slice();
      next[slot] += 1;
      return next;
    });
  }, []);

  // The swap happens while the card is hidden, right before it fades back
  // in, so fetch each slot's next photo as soon as its current one shows.
  useEffect(() => {
    turns.forEach((turn, slot) => {
      const next = photoAt(slot, turn + 1);
      if (next) new Image().src = next;
    });
  }, [turns, photoAt]);

  return {
    photoFor: (slot: number) => photoAt(slot, turns[slot]),
    advance,
  };
};
