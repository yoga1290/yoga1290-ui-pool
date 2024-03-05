workflow "ghpage" {
  on = "push"
  resolves = ["Push Action"]
}

action "Push Action" {
  uses = "./.github/action-push/"
  secrets = ["GITHUB_TOKEN"]
  env = {
    REPO_USERNAME = "yoga1290"
    REPO_URL = "github.com/yoga1290/yoga1290.github.io.git"
  }
}
