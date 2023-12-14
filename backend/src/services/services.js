function findOptimalItems(items, requirements) {
    let n = items.length;
    let dp = Array.from({ length: n + 1 }, () => Array(requirements.weight + 1).fill(0));
  
    for (let i = 1; i <= n; i++) {
      for (let j = 0; j <= requirements.weight; j++) {
        if (items[i - 1].weight <= j) {
          dp[i][j] = Math.max(
            dp[i - 1][j],
            dp[i - 1][j - items[i - 1].weight] + items[i - 1].calories
          );
        } else {
          dp[i][j] = dp[i - 1][j];
        }
      }
    }
  
    if (dp[n][requirements.weight] < requirements.calories) {
      return "No es posible alcanzar el mínimo de calorías sin exceder el peso máximo";
    }
  
    let result = [];
    let resCalories = dp[n][requirements.weight];
    let resWeight = requirements.weight;
  
    for (let i = n; i > 0 && resCalories > 0; i--) {
      if (resCalories != dp[i - 1][resWeight]) {
        result.push(items[i - 1]);
        resCalories -= items[i - 1].calories;
        resWeight -= items[i - 1].weight;
      }
    }
  
    console.log(result)
    return result.reverse();
  }

  module.exports = {findOptimalItems}