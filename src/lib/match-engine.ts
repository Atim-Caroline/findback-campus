import { type Item } from "./mock-data";

export interface MatchResult {
  item: Item;
  score: number; // 0 to 100
  matchedReasons: string[];
}

/**
 * Simple Rule-Based Matching Engine
 * Compares a target item against a list of other items to find potential matches.
 */
export function findPotentialMatches(targetItem: Item, allItems: Item[]): MatchResult[] {
  // We only want to match Lost with Found, or vice versa
  const oppositeStatus = targetItem.status === "lost" ? "found" : "lost";
  
  return allItems
    .filter((item) => item.status === oppositeStatus && item.id !== targetItem.id)
    .map((item) => {
      let score = 0;
      const matchedReasons: string[] = [];

      // 1. Category Match (Very Important)
      if (item.category === targetItem.category) {
        score += 40;
        matchedReasons.push(`Both are in ${item.category} category`);
      }

      // 2. University Match (Essential)
      if (item.university === targetItem.university) {
        score += 30;
        matchedReasons.push(`Both reported at ${item.university}`);
      }

      // 3. Keyword Match in Title/Description
      const targetKeywords = targetItem.title.toLowerCase().split(/\s+/);
      const itemText = (item.title + " " + item.description).toLowerCase();
      
      let keywordMatches = 0;
      targetKeywords.forEach(word => {
        if (word.length > 3 && itemText.includes(word)) {
          keywordMatches++;
        }
      });

      if (keywordMatches > 0) {
        score += Math.min(keywordMatches * 10, 30);
        matchedReasons.push(`Matching keywords found: ${targetKeywords.filter(w => word.length > 3 && itemText.includes(w)).join(", ")}`);
      }

      return { item, score, matchedReasons };
    })
    .filter((match) => match.score >= 50) // Only return matches with a decent score
    .sort((a, b) => b.score - a.score);
}
