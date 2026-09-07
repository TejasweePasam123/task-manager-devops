output "acr_name" {
  value = azurerm_container_registry.task_manager.name
}

output "acr_login_server" {
  value = azurerm_container_registry.task_manager.login_server
}