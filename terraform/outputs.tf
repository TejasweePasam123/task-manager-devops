output "aks_name" {
  value = azurerm_kubernetes_cluster.task_manager.name
}

output "aks_fqdn" {
  value = azurerm_kubernetes_cluster.task_manager.fqdn
}