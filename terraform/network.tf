resource "azurerm_virtual_network" "task_manager" {
  name                = "task-manager-vnet"
  location            = azurerm_resource_group.task_manager.location
  resource_group_name = azurerm_resource_group.task_manager.name
  address_space       = ["10.0.0.0/16"]

  tags = {
    project     = "task-manager"
    environment = "learning"
    managed_by  = "terraform"
  }
}

resource "azurerm_subnet" "aks" {
  name                 = "aks-subnet"
  resource_group_name  = azurerm_resource_group.task_manager.name
  virtual_network_name = azurerm_virtual_network.task_manager.name
  address_prefixes     = ["10.0.1.0/24"]
}