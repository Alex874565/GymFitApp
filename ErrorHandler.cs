using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Diagnostics;
using log4net;

namespace GymFit
{
    public class ErrorHandler
    {
        [Route("/log_error")]
        public void LogError(HttpContext context)
        {
            var exceptionHandlerFeature = context.Features.Get<IExceptionHandlerFeature>()!;
            ILog logger = LogManager.GetLogger(typeof(Program));
            logger.Error(exceptionHandlerFeature.Error.Message);
        }
    }
}
