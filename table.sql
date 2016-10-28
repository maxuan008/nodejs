CREATE TABLE `zhengquan`.`refer_qiquan` (
  `rq_id` INT(11) NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(45) NULL,
  `name` VARCHAR(45) NULL,
  `status` TINYINT(1) NULL,
  `flag` TINYINT(1) NULL,
  `cancelDate` DATE NULL,
  `buy_1` VARCHAR(45) NULL,
  `userid` VARCHAR(45) NULL,
  PRIMARY KEY (`rq_id`))
COMMENT = '智能期权的对比物';