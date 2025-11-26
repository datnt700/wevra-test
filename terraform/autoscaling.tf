# Auto Scaling for Backoffice
resource "aws_appautoscaling_target" "backoffice" {
  max_capacity       = var.max_capacity
  min_capacity       = var.min_capacity
  resource_id        = "service/${aws_ecs_cluster.main.name}/${aws_ecs_service.backoffice.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

resource "aws_appautoscaling_policy" "backoffice_cpu" {
  name               = "${var.project_name}-backoffice-cpu-scaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.backoffice.resource_id
  scalable_dimension = aws_appautoscaling_target.backoffice.scalable_dimension
  service_namespace  = aws_appautoscaling_target.backoffice.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
    target_value       = var.target_cpu_utilization
    scale_in_cooldown  = 300
    scale_out_cooldown = 60
  }
}

resource "aws_appautoscaling_policy" "backoffice_memory" {
  name               = "${var.project_name}-backoffice-memory-scaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.backoffice.resource_id
  scalable_dimension = aws_appautoscaling_target.backoffice.scalable_dimension
  service_namespace  = aws_appautoscaling_target.backoffice.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageMemoryUtilization"
    }
    target_value       = var.target_memory_utilization
    scale_in_cooldown  = 300
    scale_out_cooldown = 60
  }
}

# Auto Scaling for Frontoffice
resource "aws_appautoscaling_target" "frontoffice" {
  max_capacity       = var.max_capacity
  min_capacity       = var.min_capacity
  resource_id        = "service/${aws_ecs_cluster.main.name}/${aws_ecs_service.frontoffice.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

resource "aws_appautoscaling_policy" "frontoffice_cpu" {
  name               = "${var.project_name}-frontoffice-cpu-scaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.frontoffice.resource_id
  scalable_dimension = aws_appautoscaling_target.frontoffice.scalable_dimension
  service_namespace  = aws_appautoscaling_target.frontoffice.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
    target_value       = var.target_cpu_utilization
    scale_in_cooldown  = 300
    scale_out_cooldown = 60
  }
}

resource "aws_appautoscaling_policy" "frontoffice_memory" {
  name               = "${var.project_name}-frontoffice-memory-scaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.frontoffice.resource_id
  scalable_dimension = aws_appautoscaling_target.frontoffice.scalable_dimension
  service_namespace  = aws_appautoscaling_target.frontoffice.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageMemoryUtilization"
    }
    target_value       = var.target_memory_utilization
    scale_in_cooldown  = 300
    scale_out_cooldown = 60
  }
}
