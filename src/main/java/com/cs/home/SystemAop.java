package com.cs.home;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;

@Aspect
public class SystemAop {
    @Before("execution(* com.cs.home..*Service.saveO*(..))")
    public void inRepository12() {
        System.out.println("hell1111111");
    }

}
