resource "azurerm_resource_group" "task_manager" {
  name     = "task-manager-devops-rg"
  location = "Central India"

  tags = {
    project     = "task-manager"
    environment = "learning"
    managed_by  = "terraform"
  }
}