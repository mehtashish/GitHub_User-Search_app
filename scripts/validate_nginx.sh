# validate_nginx.sh
systemctl status nginx
if [ $? -ne 0 ]; then
  echo "NGINX is not running"
  exit 1
fi