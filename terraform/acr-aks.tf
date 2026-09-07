resource "azurerm_role_assignment" "aks_acr_pull" {
  scope                = azurerm_container_registry.task_manager.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_kubernetes_cluster.task_manager.kubelet_identity[0].object_id
}