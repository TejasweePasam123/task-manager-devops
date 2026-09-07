resource "azurerm_container_registry" "task_manager" {
  name                = "tejasweetaskmanageracr2026"
  resource_group_name = azurerm_resource_group.task_manager.name
  location            = azurerm_resource_group.task_manager.location
  sku                 = "Basic"
  admin_enabled       = false

  tags = {
    project     = "task-manager"
    environment = "learning"
    managed_by  = "terraform"
  }
}