Main repository: https://github.com/zinovik/digital-board-games

The fresh ranks can be fetched here: https://bgg-games-ranks.vercel.app/api/get-games?amount=2000

**BGG_GAMES_RANKS_STATIC** - an object with the array of games with the bgg rank

```typescript
interface BGGGamesRanksData {
  date: string;
  games: {
    rank: number;
    name: string;
    year: string;
    id: string;
  }[];
}
```

---

Tools:

- `node update.js` - updates the bgg ranks in the file
