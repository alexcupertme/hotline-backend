VALID_ARGS=$(getopt -o r:p:u: --long redispwd:,postgrespwd:,postgresusr: -- "$@")
if [[ $? -ne 0 ]]; then
    exit 1;
fi

eval set -- "$VALID_ARGS"
while [ : ]; do
  case "$1" in
    -r | --redispwd)
        export REDIS_PWD=$2
        shift 2
        ;;
    -p | --postgrespwd)
        export POSTGRES_PWD=$2
        shift 2
        ;;
    -u | --postgresusr)
        export POSTGRES_USR=$2
        shift 2
        ;;
    --) shift; 
        break 
        ;;
  esac
done

env

pm2 stop backend
pnpm i
npm run build
pm2 start --name backend npm -- run prod
